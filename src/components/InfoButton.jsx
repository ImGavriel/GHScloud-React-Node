import React from "react";
import "./InfoButton.css";

export default function InfoButton({ onClick }) {
  return (
    <button className="info-button" onClick={onClick}>
      מידע נוסף
    </button>
  );
}
