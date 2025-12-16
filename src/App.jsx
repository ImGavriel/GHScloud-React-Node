// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import pb from "./pocketbase"; // ✅ PocketBase חיבור למערכת

// 🧩 רכיבים גלובליים
import CloudScene from "./components/CloudScene";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// 🧭 עמודים
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import ForgotPassword from "./pages/ForgotPassword";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings"; // ✅ שורה זו הייתה הבעיה!

import "./App.css";

/* 🌥️ עמוד הבית */
function HomePage() {
  const navigate = useNavigate();
  const user = pb.authStore.model; // ✅ מזהה את המשתמש המחובר

  // 🔐 פונקציה להתנתקות
  const handleLogout = () => {
    pb.authStore.clear();
    navigate("/"); // חזרה לעמוד הבית
  };

  return (
    <div className="app-container">
      {/* ✅ רקע עננים */}
      <div className="cloud-background">
        <CloudScene />
      </div>

      {/* ✅ תוכן מרכזי */}
      <div className="center-button-container">
        {/* לוגו */}
        <img
          src="/images/logo.png"
          alt="GHS Logo"
          className="logo-img"
          onClick={() => navigate("/")}
        />

        {/* 🧠 אם המשתמש מחובר – הצגה אישית */}
        {user && (
          <h3
            style={{
              color: "#00e0ff",
              marginTop: "10px",
              marginBottom: "20px",
              fontWeight: "600",
              textShadow: "0 0 15px rgba(0,255,255,0.4)",
            }}
          >
            👋 ברוך הבא, {user.name || user.email.split("@")[0]}!
          </h3>
        )}

        {/* 🔷 כפתור השירותים */}
        <button
          className="center-button info-btn"
          onClick={() => navigate("/services")}
        >
          השירותים שלנו
        </button>

        {/* 👤 אם המשתמש מחובר */}
        {user ? (
          <div className="button-group">
            {/* Dashboard */}
            <button
              className="center-button"
              style={{
                background: "linear-gradient(135deg, #00bcd4, #0066ff)",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/dashboard")}
            >
              לוח הבקרה
            </button>

            {/* Logout */}
            <button
              className="center-button"
              style={{
                background: "linear-gradient(135deg, #ff5252, #ff1744)",
                fontWeight: "bold",
              }}
              onClick={handleLogout}
            >
              🚪 התנתק
            </button>
          </div>
        ) : (
          // 👥 אם המשתמש לא מחובר
          <div className="button-group">
            <button
              className="center-button"
              onClick={() => navigate("/login")}
            >
              כניסה
            </button>

            <button
              className="center-button"
              style={{
                background: "linear-gradient(135deg, #4CAF50, #2E8B57)",
              }}
              onClick={() => navigate("/register")}
            >
              הרשמה
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🧭 אפליקציה ראשית */
export default function App() {
  return (
    <Router>
      {/* ✅ Navbar קבוע לכל הדפים */}
      <Navbar />

      <Routes>
        {/* 🌍 עמודים ציבוריים */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* 🔐 עמודים פרטיים בלבד */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* 👤 התחברות והרשמה */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* ✅ Footer קבוע בכל הדפים */}
      <Footer />
    </Router>
  );
}
