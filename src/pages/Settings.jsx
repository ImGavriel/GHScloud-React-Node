// src/pages/Settings.jsx
import React, { useState, useRef } from "react";
import pb from "../pocketbase";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import "./Settings.css";

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    themeColor: localStorage.getItem("userThemeColor") || "#007bff",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = pb.authStore.model;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useTheme();

  // שינוי ערכים בסיסיים
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // העלאת תמונה
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  // בחירת צבע — משפיע מיד על כל האתר
  const handleColorPick = (color) => {
    setFormData((prev) => ({ ...prev, themeColor: color }));
    localStorage.setItem("userThemeColor", color);
    document.documentElement.style.setProperty("--primary-color", color);
    document.documentElement.style.setProperty("--primary-color-dark", color + "aa");
    document.documentElement.style.setProperty("--button-gradient", `linear-gradient(135deg, ${color}, #0044ff)`);
  };

  // עדכון משתמש
  const handleUpdate = async () => {
    if (!user) return;

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ text: "⚠️ הסיסמאות החדשות אינן תואמות", type: "error" });
      return;
    }

    if (formData.password) {
      if (!formData.currentPassword) {
        setMessage({ text: "🔒 נא להזין את הסיסמה הנוכחית", type: "error" });
        return;
      }

      try {
        await pb.collection("users").authWithPassword(user.email, formData.currentPassword);
      } catch {
        setMessage({ text: "❌ הסיסמה הנוכחית שגויה", type: "error" });
        return;
      }
    }

    try {
      setLoading(true);
      const data = {
        name: formData.name || user.name,
        bio: formData.bio || user.bio,
        themeColor: formData.themeColor,
      };
      if (formData.password) data.password = formData.password;
      if (avatar) data.avatar = avatar;

      const form = new FormData();
      Object.entries(data).forEach(([k, v]) => form.append(k, v));

      await pb.collection("users").update(user.id, form);
      setMessage({ text: "✅ הפרופיל עודכן בהצלחה!", type: "success" });
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "❌ שגיאה בעדכון הפרופיל", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h1>⚙️ ניהול פרופיל</h1>

        {user ? (
          <>
            {/* תמונת פרופיל */}
            <div className="avatar-container">
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : user.avatar
                    ? pb.files.getUrl(user, user.avatar)
                    : "/images/default-avatar.png"
                }
                alt="avatar"
                className="avatar"
              />
              <button
                className="change-avatar-btn"
                onClick={() => fileInputRef.current.click()}
              >
                📸 שנה תמונה
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </div>

            {/* פרטים אישיים */}
            <div className="settings-section">
              <h3>👤 פרטים אישיים</h3>
              <input
                type="text"
                name="name"
                placeholder={`שם (${user.name || "לא הוגדר"})`}
                value={formData.name}
                onChange={handleChange}
              />
              <textarea
                name="bio"
                placeholder="כתוב תיאור קצר על עצמך..."
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* 🎨 עיצוב אישי */}
            <div className="settings-section">
              <h3>🎨 עיצוב אישי</h3>
              <div className="theme-options">
                {["#007bff", "#8e44ad", "#e84393", "#2ecc71", "#f39c12", "#2c3e50"].map(
                  (color) => (
                    <div
                      key={color}
                      className="theme-circle"
                      style={{
                        background: color,
                        border:
                          formData.themeColor === color
                            ? "3px solid #000"
                            : "2px solid #fff",
                      }}
                      onClick={() => handleColorPick(color)}
                    ></div>
                  )
                )}
              </div>
            </div>

            {/* שינוי סיסמה */}
            <div className="settings-section">
              <h3>🔐 שינוי סיסמה</h3>
              <input
                type="password"
                name="currentPassword"
                placeholder="סיסמה נוכחית"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="סיסמה חדשה"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="אשר סיסמה חדשה"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="save-btn"
              style={{
                background: `linear-gradient(135deg, ${formData.themeColor}, #007bff)`,
              }}
            >
              {loading ? "שומר..." : "💾 שמור שינויים"}
            </button>
          </>
        ) : (
          <p className="error-msg">❌ לא נמצא משתמש מחובר</p>
        )}

        <div className="settings-actions">
          <button className="back-btn" onClick={() => navigate("/profile")}>
            ⬅ חזרה לפרופיל
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 התנתק
          </button>
        </div>

        {message && (
          <div className={`toast ${message.type}`}>
            <p>{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
