import React from "react";
import { useNavigate } from "react-router-dom";
import CloudScene from "../components/CloudScene";
import useTheme from "../hooks/useTheme";
import "./Services.css";

export default function Services() {
  useTheme();
  const navigate = useNavigate();

  // 🏗️ רשימת חבילות
  const hostingPackages = [
    {
      title: "חבילת התחלה",
      audience: "עסקים קטנים, בלוגים ואתרי תדמית",
      features: [
        "אחסון SSD מהיר עד 30GB",
        "תעבורה ללא הגבלה",
        "עד 5 אתרים פעילים",
        "SSL חינמי",
        "גיבוי יומי / שבועי",
        "תמיכה טכנית בסיסית 24/7",
      ],
      price: "₪19.99 לחודש",
      note: "מתאים לאתרים קטנים וללקוחות פרטיים שרוצים יציבות במחיר נוח.",
      highlight: false,
    },
    {
      title: "חבילת מקצועית ⭐",
      audience: "חנויות, מפתחים ועסקים בינוניים",
      features: [
        "אחסון עד 100GB SSD",
        "עד 10 אתרים פעילים",
        "גישה ל־API ו־SSH",
        "גיבוי יומי ושחזור נקודתי",
        "SSL מתקדם",
        "תמיכה מלאה 24/7",
      ],
      price: "₪49.99 לחודש",
      note: "החבילה הפופולרית ביותר — מושלמת לעסקים ומפתחים.",
      highlight: true,
    },
    {
      title: "חבילת פרימיום / חברה",
      audience: "חברות, אתרי מסחר אלקטרוני וארגונים",
      features: [
        "אחסון בלתי מוגבל",
        "שרתים ייעודיים או VPS",
        "אבטחת סייבר מתקדמת (WAF, DDoS, ניטור)",
        "תמיכת VIP 24/7",
        "CDN, דומיין מתנה וגיבויים בזמן אמת",
      ],
      price: "₪99.99 לחודש",
      note: "מותאם לחברות שדורשות אמינות, מהירות וסקייל ברמה הגבוהה ביותר.",
      highlight: false,
    },
  ];

  // 🔗 פונקציית הפניה להרשמה
  const handleClick = () => {
    const confirmJoin = window.confirm(
      "🚀 חבילות האחסון יהיו זמינות בקרוב!\nרוצה להצטרף עכשיו ולקבל גישה מוקדמת?"
    );
    if (confirmJoin) {
      navigate("/register");
    }
  };

  return (
    <div className="services-page">
      {/* ☁️ רקע עננים */}
      <div className="cloud-background">
        <CloudScene />
      </div>

      {/* ✨ שכבת הזכוכית */}
      <div className="services-overlay">
        <div className="services-container fade-in">
          <h1 className="services-title">
            ☁️ חבילות אחסון <span className="highlight">GHS Cloud</span>
          </h1>

          <p className="services-desc">
            אנו מציעים פתרונות אחסון חכמים, מהירים ומאובטחים –  
            החל מאתרים קטנים ועד רשתות עסקיות גדולות.  
            כרגע אנו בשלבי פיתוח מתקדמים — אבל כבר עכשיו אפשר להצטרף לרשימת ההשקה 🚀
          </p>

          {/* 💠 רשימת חבילות */}
          <div className="packages-list">
            {hostingPackages.map((pkg, i) => (
              <div
                key={i}
                className={`package-card ${pkg.highlight ? "highlight-card" : ""}`}
              >
                {pkg.highlight && <div className="popular-badge">🔥 הכי פופולרי</div>}

                <h2>{pkg.title}</h2>
                <p className="audience">🎯 מיועד ל: {pkg.audience}</p>

                <ul className="features">
                  {pkg.features.map((f, index) => (
                    <li key={index}>{f}</li>
                  ))}
                </ul>

                <p className="price-tag">{pkg.price}</p>
                <p className="note">{pkg.note}</p>

                {/* 🔗 כפתור הרשמה מוקדמת */}
                <button className="choose-btn" onClick={handleClick}>
                   🚧 בפיתוח – לפרטים נוספים
                </button>
              </div>
            ))}
          </div>

          {/* 🔙 חזרה לדף הראשי */}
          <button className="back-home-btn" onClick={() => navigate("/")}>
            ← חזרה לדף הראשי
          </button>
        </div>
      </div>
    </div>
  );
}
