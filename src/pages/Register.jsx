import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import useTheme from "../hooks/useTheme"; // ✅ מוסיפים את ה־hook
import pb from "../pocketbase";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ מפעיל את מערכת ערכות הנושא (במקום useEffect הארוך)
  useTheme();

  // 🧠 לוגיקת טופס
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setMessage({ text: "❌ יש למלא את כל השדות", type: "error" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessage({ text: "❌ כתובת האימייל אינה תקינה", type: "error" });
      return false;
    }

    if (form.password.length < 6) {
      setMessage({
        text: "❌ הסיסמה חייבת להכיל לפחות 6 תווים",
        type: "error",
      });
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setMessage({ text: "❌ הסיסמאות אינן תואמות", type: "error" });
      return false;
    }

    if (!form.termsAccepted) {
      setMessage({ text: "❌ יש לאשר את תנאי השימוש", type: "error" });
      return false;
    }

    return true;
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage({ text: "", type: "" });

  if (!validateForm()) return;

  setLoading(true);
  try {
    // שולח ישירות ל־PocketBase
    const user = await pb.collection("users").create({
      email: form.email,
      password: form.password,
      passwordConfirm: form.confirmPassword,
      name: form.name,
    });

    // 🟩 שולח מייל אימות אוטומטי אחרי ההרשמה
    await pb.collection("users").requestVerification(form.email);

    setMessage({
      text: "✅ נרשמת בהצלחה! נשלח אליך מייל לאימות החשבון 📩",
      type: "success",
    });

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });

    // אפשר להפנות למסך כניסה אחרי 3 שניות
    setTimeout(() => navigate("/login"), 3000);
  } catch (err) {
    console.error(err);
    setMessage({
      text: err.message || "❌ שגיאה בהרשמה",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <img
          src="/images/logo.png"
          alt="GHS Logo"
          className={styles.registerLogo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <h2>צור חשבון חדש</h2>
        <p className={styles.registerSubtitle}>
          הצטרף לקהילה שלנו ותהנה מגישה לכל התכנים!
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>שם מלא</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="הכנס שם מלא"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>אימייל</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>סיסמה</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>אימות סיסמה</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="הקלד שוב את הסיסמה"
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleChange}
              />{" "}
              אני מאשר את{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                תנאי השימוש
              </a>
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ נרשם..." : "🚀 הרשמה"}
          </button>
        </form>

        {message.text && (
          <p className={`${styles.registerMessage} ${styles[message.type]}`}>
            {message.text}
          </p>
        )}

        <p className={styles.registerFooter}>
          כבר יש לך חשבון?{" "}
          <span onClick={() => navigate("/login")}>התחבר כאן</span>
        </p>

        {/* 🎨 ערכות נושא משותפות */}
        <div className="theme-btn-container" />
      </div>
    </div>
  );
}
