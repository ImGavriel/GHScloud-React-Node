import React from "react";
import { useNavigate } from "react-router-dom";
import CloudScene from "../components/CloudScene";
import useTheme from "../hooks/useTheme";
import "./Careers.css";

export default function Careers() {
  useTheme();
  const navigate = useNavigate();

  const positions = [
    {
      title: "מפתח/ת אתרים (Web Developer)",
      desc: "אחריות מלאה על פיתוח, תחזוקה ושדרוג של אתרי לקוחות ואתרי החברה. עבודה עם React, Node.js ו־PocketBase בסביבת פיתוח חדשנית ומתקדמת.",
      requirements: [
        "ניסיון מוכח בפיתוח אתרים (Front-End / Full Stack)",
        "ידע ב־HTML, CSS, JavaScript, React",
        "יתרון לידע ב־Node.js ו־API Integration",
      ],
    },
    {
      title: "מתכנת/ת מערכות (Software Developer)",
      desc: "פיתוח מודולים חדשים, פתרון באגים ושיפור ביצועים של מערכות קיימות. עבודה ישירה עם צוותי UI ו־DevOps לשיפור חוויית המשתמש וביצועי השרת.",
      requirements: [
        "ידע ב־C#, Node.js או Python",
        "הבנה טובה של בסיסי נתונים (MongoDB / MySQL)",
        "יכולת פתרון בעיות ולמידה עצמית גבוהה",
      ],
    },
    {
      title: "בודק/ת תוכנה (QA Tester)",
      desc: "ביצוע בדיקות קפדניות לאתרים ולמערכות פנים, כתיבת תסריטי בדיקה ודיווח תקלות. עבודה מול צוותי פיתוח לשיפור איכות המוצר.",
      requirements: [
        "ניסיון בבדיקות Web (פונקציונליות ועומסים)",
        "ידע בכלים כמו Postman, Selenium או Cypress",
        "יכולת עבודה עצמאית וירידה לפרטים",
      ],
    },
    {
      title: "מנהל/ת שרתים ותשתיות (System Administrator)",
      desc: "אחריות על תחזוקת שרתי החברה, ניהול גיבויים, אבטחת מידע ותצורות רשת. עבודה בסביבת Linux ו־Docker בענן (AWS / VPS).",
      requirements: [
        "ניסיון בניהול שרתי Linux ו־Docker",
        "ידע בסיסי באבטחת מידע ותחזוקת VPS",
        "יכולת ניטור ופתרון תקלות בזמן אמת",
      ],
    },
   {
  title: "ראש צוות פיתוח (Team Leader)",
  desc: "ניהול צוות פיתוח קטן ומוכשר, הובלת פרויקטים משלב הרעיון ועד העלייה לאוויר, ליווי והדרכת מפתחים צעירים, וקבלת החלטות טכנולוגיות משמעותיות.",
  requirements: [
    "ניסיון של שנתיים לפחות בפיתוח Web",
    "ניסיון בניהול או הובלת צוות טכנולוגי – יתרון משמעותי",
    "יכולות הנהגה, אחריות ותקשורת מצוינת בצוות",
  ],
  },
    {
      title: "מתנדב/ת טכנולוגי/ת (Volunteer Developer)",
      desc: "הזדמנות מדהימה להשתלב בצוות טכנולוגי מוביל ולצבור ניסיון אמיתי. מתאים לסטודנטים, חיילים משוחררים או כל מי שאוהב טכנולוגיה ורוצה לתרום מהזמן שלו.",
      requirements: [
        "רצון ללמוד ולהתפתח בעולם הפיתוח",
        "היכרות בסיסית עם אחת מהשפות: JavaScript / Python / C#",
        "נכונות להקדיש כמה שעות בשבוע לצוות",
      ],
    },
  ];

  return (
    <div className="careers-page">
      {/* ☁️ רקע עננים */}
      <div className="cloud-background">
        <CloudScene />
      </div>

      {/* ✨ שכבת זכוכית */}
      <div className="careers-overlay">
        <div className="careers-container">
          <h1 className="careers-title">💼 הצטרפו אל משפחת GHS Hosting</h1>
          <p className="careers-intro">
            ב־<strong>GHS Hosting</strong> אנחנו מאמינים שהאנשים שלנו הם המפתח להצלחה.  
            אם אתם רוצים לצמוח, לתרום מהידע שלכם ולהיות חלק מקהילה טכנולוגית איכותית —  
            זה המקום שלכם ☁️
          </p>

          <div className="positions-grid">
            {positions.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <p className="job-desc">{job.desc}</p>
                </div>

                <div className="job-details">
                  <h3>דרישות התפקיד:</h3>
                  <ul className="job-reqs">
                    {job.requirements.map((req, i) => (
                      <li key={i}>✅ {req}</li>
                    ))}
                  </ul>
                </div>

                {/* 👇 מעבר לטופס פנייה עם קטגוריית קריירה */}
                <button
                  className="apply-btn"
                  onClick={() => navigate("/contact?subject=career")}
                >
                  הגישו מועמדות ✉️
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
