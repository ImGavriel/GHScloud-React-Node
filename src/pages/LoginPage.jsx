import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import useTheme from "../hooks/useTheme";
import "./LoginPage.css";

export default function LoginPage() {
  useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const authData = await pb.collection("users").authWithPassword(email, password);

      if (!authData?.record?.verified) {
        setMessage("⚠️ עליך לאמת את כתובת המייל לפני ההתחברות");
        pb.authStore.clear();
        setLoading(false);
        return;
      }

      setMessage("✅ התחברת בהצלחה!");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error("❌ שגיאת התחברות:", err);
      setMessage(err?.response?.message ? `❌ ${err.response.message}` : "❌ אימייל או סיסמה שגויים");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* רקע תאורה */}
      <div className="login-glow"></div>

      <div className="login-layout">
        {/* צד שמאל – לוגו עם תנועה חלקה */}
        <div className="illustration-side">
          <div className="logo-wrapper">
            <img
              src="/images/logo.png"
              alt="GHS Logo"
              className="illustration"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        {/* צד ימין – טופס זכוכית */}
        <div className="login-side">
          <div className="glass">
            <h1 className="login-title">התחברות למערכת</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "⏳ מתחבר..." : "🚀 התחברות"}
              </button>
            </form>

            {message && <p className="login-message">{message}</p>}

            <div className="register-forget">
              <Link to="/register">הרשמה</Link>
              <Link to="/forgot">?שכחת סיסמה</Link>
            </div>

            <Link to="/" className="back-home">
              ← חזרה לעמוד הראשי
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
