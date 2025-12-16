import React, { useEffect, useState } from "react";
import "./InfoCard.css";

export default function InfoCard({ title, price, details, backText }) {
  const [flipped, setFlipped] = useState(false);

  // ✅ סיבוב אוטומטי כל 5 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="flip-card-inner">
        {/* צד קדמי */}
        <div className="flip-card-front">
          <h2 className="plan-title">{title}</h2>
          <p className="plan-price">{price} ₪</p>
          <ul className="plan-details">
            {details.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button className="plan-btn">למידע נוסף</button>
        </div>

        {/* צד אחורי */}
        <div className="flip-card-back">
          <h3 className="back-title">מידע נוסף</h3>
          <p className="back-text">{backText}</p>
          <button className="plan-btn">חזרה</button>
        </div>
      </div>
    </div>
  );
}
