import React from "react";
import CloudScene from "../components/CloudScene";
import useTheme from "../hooks/useTheme";
import "./About.css";

export default function About() {
  useTheme();

  return (
    <div className="about-page">
      {/* ☁️ רקע עננים */}
      <div className="cloud-background">
        <CloudScene />
      </div>

      {/* ✨ שכבת הזכוכית */}
      <div className="about-overlay">
        <div className="about-container">
          {/* 🔷 כותרת ראשית */}
          <h1 className="about-title">
            💎 מי אנחנו <span className="highlight">GHS Hosting</span>
          </h1>

          <p className="about-desc">
            <strong>GHS Hosting</strong> נוסדה מתוך חזון ברור — להנגיש טכנולוגיה חכמה, בטוחה ונגישה לכל אחד.  
            החברה מנוהלת באופן מלא על ידי <strong>גבריאל בניהוייב</strong>, מייסד ומנכ״ל,  
            אשר אחראי אישית על הפיתוח, העיצוב, ניהול השרתים, התשתיות והכיוון האסטרטגי של החברה.  
            הכל נעשה מתוך אהבה אמיתית לטכנולוגיה ומתוך רצון לבנות משהו שונה — אמין, אנושי ומקצועי.
          </p>

          {/* 🌟 מה מייחד אותנו */}
          <h2 className="section-title">🌟 מה מייחד אותנו</h2>
          <div className="about-grid">
            <div className="about-card">
              <h2>⚙️ פיתוח בהתאמה אישית</h2>
              <p>
                כל פתרון נבנה מאפס בהתאם לצורכי הלקוח — ללא תבניות מוכנות,  
                עם דגש על חוויית משתמש, מהירות, ואבטחה.
              </p>
            </div>

            <div className="about-card">
              <h2>🚀 ביצועים מקסימליים</h2>
              <p>
                שרתי SSD חזקים, תשתית מבוזרת (CDN), ומערכות ניטור בזמן אמת  
                מבטיחים טעינה מהירה וזמינות 24/7.
              </p>
            </div>

            <div className="about-card">
              <h2>🔒 אבטחה ברמה צבאית</h2>
              <p>
                כל מערכת נבדקת באופן ידני, עם שכבות הגנה מתקדמות, הצפנת מידע,  
                גיבויים יומיים והתאמה לתקני GDPR ו־ISO.
              </p>
            </div>

            <div className="about-card">
              <h2>🤝 שירות אישי וישיר</h2>
              <p>
                בלי מוקדים ובלי תורים. כל לקוח מדבר ישירות עם גבריאל —  
                מקבל מענה אמיתי, אנושי ומיידי.
              </p>
            </div>

            <div className="about-card">
              <h2>🌐 פתרונות כוללים</h2>
              <p>
                פיתוח אתרים, אחסון, תחזוקה, שרתים, דומיינים, אבטחת מידע,  
                ותמיכה טכנית — הכול במקום אחד.
              </p>
            </div>

            <div className="about-card">
              <h2>💡 חדשנות מתמדת</h2>
              <p>
                שימוש קבוע בטכנולוגיות חדשות — AI, אוטומציה, DevOps,  
                ויישום כלים מתקדמים לשיפור יעילות ומהירות.
              </p>
            </div>
          </div>

          {/* 👨‍💻 אודות המייסד */}
          <h2 className="section-title">👨‍💻 המייסד והמנהלים</h2>
          <div className="team-grid single">
            <div className="team-card">
              <h3>גבריאל בניהוייב</h3>
              <p>Founder, CEO & CTO</p>
              <span>
                גבריאל הוא לב החברה — אחראי על כל שלב בתהליך, מהקונספט ועד למוצר הסופי.  
                מומחה בפיתוח אתרים, ניהול שרתים, אבטחת מידע, DevOps ותכנון מערכות ענן.  
                בעבורו, כל פרויקט הוא לא רק עבודה — אלא יצירה.
              </span>
            </div>
          </div>

          {/* 💡 החזון שלי */}
          <h2 className="section-title">💡 החזון שלי</h2>
          <div className="vision-card">
            <p>
              אני מאמין שטכנולוגיה נועדה לשרת אנשים — לא להפך.  
              החזון שלי הוא להפוך את העולם הדיגיטלי לנגיש, אמין ופשוט יותר,  
              כך שכל אחד — בין אם עסק קטן או יזם עצמאי — יוכל ליהנות מהיכולות של הענן  
              בלי מורכבות, בלי פחד ובלי עלויות מיותרות.
            </p>

            <p>
              <strong>GHS Hosting</strong> נבנתה מתוך אמונה שכאשר אתה שולט בכל פרט —  
              מהשרת ועד חוויית המשתמש — אתה יוצר מערכת שלא רק עובדת, אלא גם מרגישה טוב.  
              כי בסוף, מאחורי כל שורה של קוד — יש אנשים.
            </p>

            <blockquote>
              "לא רק להחזיק שרת — אלא להחזיק חזון.  
              לא רק לפתח קוד — אלא לפתח חוויה."
            </blockquote>
          </div>

          {/* 🌍 כפתור יצירת קשר */}
          <button
            className="contact-btn"
            onClick={() => (window.location.href = "/contact")}
          >
            דברו איתי 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
