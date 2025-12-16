import React from "react";
import { useNavigate } from "react-router-dom";
import CloudScene from "../components/CloudScene";
import useTheme from "../hooks/useTheme";
import "./Terms.css";

export default function Terms() {
  const navigate = useNavigate();
  useTheme(); // מפעיל ערכת נושא גלובלית

  return (
    <div className="terms-page">
      {/* רקע עננים */}
      <div className="cloud-background">
        <CloudScene />
      </div>

      {/* כרטיס תנאי השימוש */}
      <div className="terms-card">
        <h1>
          תנאי שימוש במערכת <span className="highlight">GHS</span>
        </h1>
        <p>
          ברוך הבא למערכת <span className="highlight">GHS</span>. בשימוש באתר זה אתה מסכים
          לתנאים המפורטים להלן:
        </p>

        <h2>1. כללי</h2>
        <p>
          השימוש במערכת מיועד למשתמשים מעל גיל 16 בלבד. שימוש לא תקין או בלתי חוקי יגרור חסימה מיידית.
        </p>

        <h2>2. פרטיות</h2>
        <p>
          אנו מתחייבים לשמור על פרטיות המשתמשים. מידע אישי לא יועבר לצדדים שלישיים ללא הסכמה מפורשת.
        </p>

        <h2>3. אבטחה</h2>
        <p>
          אנו משתמשים באמצעי אבטחה מתקדמים, אך איננו אחראים לנזקים עקב פריצות או גישה לא מורשית.
        </p>

        <h2>4. זכויות יוצרים</h2>
        <p>
          כל התכנים והעיצובים באתר הם קניין רוחני של{" "}
          <span className="highlight">GHS</span> ואסור להעתיק או להשתמש בהם ללא אישור.
        </p>

        <p className="terms-footer">
          המשך השימוש באתר מהווה הסכמה מלאה לכל התנאים.
        </p>

        {/* כפתור חזרה עובד עם React Router */}
        <button
          type="button"
          className="back-register"
          onClick={() => navigate("/register")}
        >
          ← חזרה להרשמה
        </button>

        {/* מקום לכפתורי ערכת נושא אם תרצה בעתיד */}
        <div className="theme-btn-container" />
      </div>
    </div>
  );
}
