import { useEffect } from "react";
import pb from "../pocketbase";

export default function useTheme() {
  useEffect(() => {
    const user = pb.authStore.model;
    const root = document.documentElement;

    // טוען צבע שמור או צבע ברירת מחדל
    const savedColor = localStorage.getItem("userThemeColor");
    const savedMode = localStorage.getItem("userThemeMode"); // light / dark
    const themeColor = (user && user.themeColor) || savedColor || "#007bff";
    const mode = savedMode || "light";

    // פונקציה לחישוב גוון כהה/בהיר
    function shadeColor(color, percent) {
      let R = parseInt(color.substring(1, 3), 16);
      let G = parseInt(color.substring(3, 5), 16);
      let B = parseInt(color.substring(5, 7), 16);

      R = Math.min(255, parseInt((R * (100 + percent)) / 100));
      G = Math.min(255, parseInt((G * (100 + percent)) / 100));
      B = Math.min(255, parseInt((B * (100 + percent)) / 100));

      const RR = R.toString(16).padStart(2, "0");
      const GG = G.toString(16).padStart(2, "0");
      const BB = B.toString(16).padStart(2, "0");
      return `#${RR}${GG}${BB}`;
    }

    // הפונקציה שמעדכנת את כל המשתנים באתר
    const applyTheme = (color, mode) => {
      const darker = shadeColor(color, -25);
      const lighter = shadeColor(color, 25);
      const accent = shadeColor(color, 45);

      // 🎨 צבעים בסיסיים
      root.style.setProperty("--primary-color", color);
      root.style.setProperty("--primary-color-dark", darker);
      root.style.setProperty("--primary-color-light", lighter);
      root.style.setProperty("--accent-color", accent);
      root.style.setProperty("--button-gradient", `linear-gradient(135deg, ${color}, ${darker})`);
      root.style.setProperty("--primary-shadow", `${color}55`);

      // 🌗 מצב כהה / בהיר
      if (mode === "dark") {
        root.style.setProperty("--background", `radial-gradient(circle at top, #000 0%, ${darker}40 100%)`);
        root.style.setProperty("--navbar-bg", "rgba(5, 10, 20, 0.8)");
        root.style.setProperty("--navbar-hover-bg", "rgba(10, 25, 45, 0.9)");
        root.style.setProperty("--text-color", "#e6f6ff");
        root.style.setProperty("--link-color", "#b6f7ff");
        root.style.setProperty("--subtitle-color", "#aee4ff");

        document.body.style.background = `radial-gradient(circle at top, #000 0%, ${darker}40 100%)`;
        document.body.style.color = "#e6f6ff";

        // ⚡ התאמת רקע העננים אם יש CloudScene
        const canvas = document.querySelector(".cloud-container canvas");
        if (canvas) canvas.style.filter = "brightness(0.8) contrast(1.2)";
      } 
      else {
        root.style.setProperty("--background", `linear-gradient(135deg, ${color}10, #ffffff)`);
        root.style.setProperty("--navbar-bg", "rgba(255, 255, 255, 0.55)");
        root.style.setProperty("--navbar-hover-bg", "rgba(255, 255, 255, 0.75)");
        root.style.setProperty("--text-color", "#001a2b");
        root.style.setProperty("--link-color", "#00495f");
        root.style.setProperty("--subtitle-color", "#007bff");

        document.body.style.background = `linear-gradient(135deg, ${color}10, #ffffff)`;
        document.body.style.color = "#001a2b";

        // ⚡ החזרת העננים לצבעם הבהיר
        const canvas = document.querySelector(".cloud-container canvas");
        if (canvas) canvas.style.filter = "brightness(1.1) contrast(1)";
      }

      document.body.style.transition = "all 0.6s ease";
      localStorage.setItem("userThemeColor", color);
      localStorage.setItem("userThemeMode", mode);
    };

    // ✅ הפעלה ראשונית
    applyTheme(themeColor, mode);

    // ✅ מאזין לשינויים עתידיים (למשל אם משתמש משנה צבע או מצב)
    const observer = new MutationObserver(() => {
      const newColor = pb.authStore.model?.themeColor || localStorage.getItem("userThemeColor");
      const newMode = localStorage.getItem("userThemeMode") || "light";
      if (newColor) applyTheme(newColor, newMode);
    });

    observer.observe(document.body, { attributes: true, childList: false, subtree: false });

    // ✅ ניקוי מאזין בזמן יציאה
    return () => observer.disconnect();
  }, []);
}
