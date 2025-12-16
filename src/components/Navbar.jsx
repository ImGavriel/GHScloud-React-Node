import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    // מאזין בזמן אמת לשינויים במצב ההתחברות
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* לוגו - מחזיר לדף הבית */}
        <div
          className="navbar-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h1 className="navbar-title">
            <span className="ghs">GHS</span>
            <span className="divider"> | </span>
            <span className="company-name">Global Host Solutions</span>
          </h1>
          <p className="navbar-subtitle">פתרונות אחסון וענן עולמיים</p>
        </div>

        {/* קישורים */}
        <ul className="navbar-links">
          <li>
            <a href="#" onClick={() => navigate("/about")}>
              מי אנחנו ?
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigate("/services")}>
              השירותים שלנו
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigate("/careers")}>
              בוא לעבוד איתנו
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigate("/contact")}>
              צור קשר
            </a>
          </li>

          {/* הצגת כפתורים לפי מצב המשתמש */}
          {!user ? (
            <li>
              <a href="#" onClick={() => navigate("/login")}>
                כניסה
              </a>
            </li>
          ) : (
            <>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/profile");
                  }}
                >
                  פרופיל
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  התנתק
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
