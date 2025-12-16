import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import useTheme from "../hooks/useTheme";
import "./Dashboard.css";

export default function Dashboard() {
  useTheme();
  const navigate = useNavigate();
  const user = pb.authStore.model;
  const [timeGreeting, setTimeGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting("בוקר טוב");
    else if (hour < 18) setTimeGreeting("צהריים טובים");
    else setTimeGreeting("ערב טוב");
  }, []);

  // אם מסיבה כלשהי אין משתמש (למרות ProtectedRoute)
  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-glow" />
        <div className="dashboard-card dashboard-animate">
          <h1 className="dash-title">צריך להתחבר מחדש</h1>
          <p className="dash-subtitle">
            נראה שפג תוקף ההתחברות. לחץ מטה כדי להיכנס שוב.
          </p>
          <div className="dashboard-buttons">
            <button onClick={() => navigate("/login")}>🚀 להתחברות</button>
            <button onClick={() => navigate("/")}>🏠 חזרה לדף הראשי</button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = user.name || (user.email ? user.email.split("@")[0] : "משתמש");

  const handleLogout = () => {
    pb.authStore.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      {/* זוהר רקע */}
      <div className="dashboard-glow" />

      <div className="dashboard-card dashboard-animate">
        {/* כותרת */}
        <div className="dash-header">
          <p className="dash-kicker">⚡ GHS Cloud Panel</p>
          <h1 className="dash-title">
            {timeGreeting}{" "}
            <span className="dash-highlight">{displayName}</span> 👋
          </h1>
          <p className="dash-subtitle">
            ברוך הבא ללוח הבקרה של <b>GHS Hosting</b>
          </p>
        </div>

        {/* מידע מהיר */}
        <div className="dash-grid">
          <div className="dash-stat">
            <span className="dash-label">מזהה משתמש</span>
            <span className="dash-value dash-id">{user.id}</span>
          </div>

          <div className="dash-stat">
            <span className="dash-label">אימייל</span>
            <span className="dash-value">{user.email}</span>
          </div>

          <div className="dash-stat">
            <span className="dash-label">סטטוס אימייל</span>
            <span
              className={
                "dash-pill " + (user.verified ? "pill-ok" : "pill-warn")
              }
            >
              {user.verified ? "מאומת ✅" : "ממתין לאימות ✉️"}
            </span>
          </div>

          <div className="dash-stat">
            <span className="dash-label">שירותים פעילים</span>
            <span className="dash-value"> 0 </span>
            <span className="dash-hint">
              בקרוב: אתרים, דומיינים, שרתים ו־SSL במקום אחד ⚙️
            </span>
          </div>
        </div>

        {/* קישורים מהירים / ניווט */}
        <div className="dashboard-buttons">
          <button onClick={() => navigate("/")}>🏠 עמוד הבית</button>
          <button onClick={() => navigate("/profile")}>👤 פרופיל</button>
          <button onClick={() => navigate("/settings")}>⚙️ הגדרות</button>
          <button onClick={() => navigate("/services")}>📦 השירותים שלנו</button>
          <button onClick={() => navigate("/contact")}>💌 תמיכה / צור קשר</button>
        </div>

        {/* אזור "בקרוב" / שירותים */}
        <div className="quick-links">
          <h3 className="quick-title">ניהול מהיר</h3>
          <div className="quick-grid">
            <div className="quick-card">
              <h4>ניהול דומיינים</h4>
              <p>חיבור דומיינים, הפניות, ו־DNS מתקדמים (זמין בקרוב).</p>
              <span className="quick-tag">Soon</span>
            </div>
            <div className="quick-card">
              <h4>אתרים מאוחסנים</h4>
              <p>סקירת אתרים פעילים, משאבים ותעבורה.</p>
              <span className="quick-tag disabled">0 אתרים</span>
            </div>
            <div className="quick-card">
              <h4>אבטחה &amp; SSL</h4>
              <p>תעודות SSL אוטומטיות ואבטחת גישה לחשבון.</p>
              <span className="quick-tag">Protected</span>
            </div>
          </div>
        </div>

        {/* כרטיס תמיכה */}
        <div className="support-card">
          <h3>צריך עזרה?</h3>
          <p>
            צוות <b>GHS</b> כאן בשבילך 24/7 להגדרות DNS, חיבור דומיין, תיבות
            מייל, אבטחה ועוד.
          </p>
          <button
            className="support-btn"
            onClick={() => navigate("/contact")}
          >
            דיבור עם התמיכה 🚀
          </button>
        </div>

        {/* התנתקות */}
        <div className="bottom-actions">
          <button onClick={handleLogout} className="logout-btn">
            🚪 התנתקות מהמערכת
          </button>
        </div>
      </div>
    </div>
  );
}
