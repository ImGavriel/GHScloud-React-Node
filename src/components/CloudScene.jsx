import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import "./CloudScene.css";

export default function CloudScene() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const fog = new THREE.Fog(0x4584b4, -100, 3000);
    scene.fog = fog;

    const shader = {
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec2 vUv;
        void main() {
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fogFactor = smoothstep(fogNear, fogFar, depth);
          gl_FragColor = texture2D(map, vUv);
          gl_FragColor.w *= pow(gl_FragCoord.z, 20.0);
          gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);
        }
      `,
    };

    const loader = new THREE.TextureLoader();
    loader.load("https://mrdoob.com/lab/javascript/webgl/clouds/cloud10.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          fogColor: { value: fog.color },
          fogNear: { value: fog.near },
          fogFar: { value: fog.far },
        },
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        depthWrite: false,
        depthTest: false,
        transparent: true,
      });

      const plane = new THREE.PlaneGeometry(64, 64);
      const geometries = [];
      const planeObj = new THREE.Object3D();

      for (let i = 0; i < 8000; i++) {
        planeObj.position.x = Math.random() * 1000 - 500;
        planeObj.position.y = -Math.random() * Math.random() * 200 - 15;
        planeObj.position.z = i;
        planeObj.rotation.z = Math.random() * Math.PI;
        planeObj.scale.x = planeObj.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        planeObj.updateMatrix();

        const cloned = plane.clone();
        cloned.applyMatrix4(planeObj.matrix);
        geometries.push(cloned);
      }

      const merged = mergeGeometries(geometries);
      const meshA = new THREE.Mesh(merged, material);
      const meshB = meshA.clone();
      meshB.position.z = -8000;
      scene.add(meshA, meshB);

      camera.position.z = 6000;

      const start = Date.now();

      function animate() {
        requestAnimationFrame(animate);
        const elapsed = (Date.now() - start) * 0.03;
        const pos = elapsed % 8000;
        camera.position.z = -pos + 8000;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    });

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div className="container" ref={containerRef}></div>;
}
