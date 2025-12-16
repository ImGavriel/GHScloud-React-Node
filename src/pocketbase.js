// src/pocketbase.js
import PocketBase from "pocketbase";

/**
 * 🌐 מזהה את השרת של PocketBase אוטומטית
 * עובד גם בלוקאל וגם בפרודקשן
 */
const getPbBase = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    return `${protocol}//${hostname}:8090`;
  }
  return "http://127.0.0.1:8090";
};

const pb = new PocketBase(getPbBase());

/**
 * 🔒 Auth – Cookie + LocalStorage
 */
if (typeof window !== "undefined") {
  try {
    pb.authStore.loadFromCookie(document.cookie);

    const savedAuth = localStorage.getItem("pb_auth");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      if (parsed.token && parsed.model) {
        pb.authStore.save(parsed.token, parsed.model);
      }
    }

    pb.authStore.onChange(() => {
      document.cookie = pb.authStore.exportToCookie({
        httpOnly: false,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      });

      localStorage.setItem(
        "pb_auth",
        JSON.stringify({
          token: pb.authStore.token,
          model: pb.authStore.model,
        })
      );
    });
  } catch (err) {
    console.warn("⚠️ שגיאה בניהול AuthStore:", err);
  }
}

/**
 * 👤 פונקציות עזר
 */
export async function login(email, password) {
  const authData = await pb.collection("users").authWithPassword(email, password);

  localStorage.setItem(
    "pb_auth",
    JSON.stringify({
      token: pb.authStore.token,
      model: pb.authStore.model,
    })
  );

  document.cookie = pb.authStore.exportToCookie({
    httpOnly: false,
    sameSite: "Lax",
    secure: window.location.protocol === "https:",
  });

  return authData;
}

export function logout() {
  pb.authStore.clear();
  document.cookie = "";
  localStorage.removeItem("pb_auth");
}

export function currentUser() {
  return pb.authStore.model;
}

export function getUserRoles() {
  const user = pb.authStore.model;
  if (!user) return {};

  return {
    vip: !!user.vip,
    admin: !!user.admin,
    owner: !!user.owner,
    partner: !!user.partner,
    betaTester: !!user.betaTester,
    developer: !!user.developer,
    supportAgent: !!user.supportAgent,
    verified: !!user.verified,
  };
}

export async function testConnection() {
  try {
    const res = await fetch(`${getPbBase()}/api/health`);
    if (res.ok) return true;
  } catch (err) {
    console.warn("⚠️ PocketBase לא זמין:", err);
  }
  return false;
}

export default pb;
