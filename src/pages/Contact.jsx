import React, { useState } from "react";
import CloudScene from "../components/CloudScene";
import useTheme from "../hooks/useTheme";
import pb from "../pocketbase";
import "./Contact.css";

export default function Contact() {
  useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("אנא הזן מספר טלפון תקין 📱");
      return;
    }

    setSending(true);
    setSent(false);

    try {
      await pb.collection("messages").create(formData);
      setSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ שגיאה בשליחה:", err);
      alert("❌ קרתה שגיאה בעת השליחה, נסה שוב מאוחר יותר.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      {/* ☁️ רקע עננים */}
      <div className="cloud-background">
        <CloudScene />
      </div>

      {/* 🔷 שכבת זכוכית */}
      <div className="contact-overlay">
        <div className="contact-container">
          <h1 className="contact-title">📨 צור קשר</h1>
          <p className="contact-desc">
            נשמח לשמוע ממך! מלא את הטופס ואחד מנציגינו יחזור אליך בהקדם ☁️
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>שם מלא</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="הכנס את שמך"
              required
            />

            <label>אימייל</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />

            <label>טלפון</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="הזן מספר טלפון ליצירת קשר"
              required
            />

            <label>נושא הפנייה</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">בחר נושא...</option>
  <option value="support">תמיכה טכנית</option>
  <option value="sales">מכירות</option>
  <option value="partnership">שיתופי פעולה</option>
  <option value="billing">חשבוניות ותשלומים</option>
  <option value="career">קריירה / הצטרפות לצוות</option>
  <option value="other">אחר</option>
            </select>

            <label>הודעה</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="כתוב כאן את הודעתך..."
              required
            ></textarea>

            <button
              type="submit"
              className={`send-btn ${sending ? "sending" : ""}`}
              disabled={sending}
            >
              {sending ? "⏳ שולח..." : "✉️ שליחה"}
            </button>
          </form>

          {sent && (
            <p className="success-message">
              ✅ ההודעה שלך נשלחה ונשמרה במערכת!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
