import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import useTheme from "../hooks/useTheme";
import pb from "../pocketbase"; // ✅ חיבור ל־PocketBase

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("❌ נא להזין כתובת אימייל תקינה");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ שולח בקשת איפוס אמיתית ל־PocketBase
      await pb.collection("users").requestPasswordReset(email);
      setMessage("📧 קישור לאיפוס סיסמה נשלח למייל שלך!");
    } catch (err) {
      console.error(err);
      if (err.status === 404)
        setMessage("⚠️ כתובת האימייל אינה קיימת במערכת");
      else setMessage("❌ שגיאה בשליחת הבקשה, נסה שוב מאוחר יותר");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        <div className="illustration-side">
          <img
            src="/images/logo.png"
            alt="GHS Logo"
            className="illustration"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="login-side">
          <div className="glass">
            <h1 className="login-title">איפוס סיסמה</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="הכנס כתובת אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "⏳ שולח..." : "שלח קישור לאיפוס"}
              </button>
            </form>

            {message && <p style={{ marginTop: "10px" }}>{message}</p>}

            <div className="register-forget">
              <span
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer", color: "var(--primary-color)" }}
              >
                ← חזרה להתחברות
              </span>
            </div>

            <div className="theme-btn-container" />
          </div>
        </div>
      </div>
    </div>
  );
}
