import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import pb from "../pocketbase";

/**
 * 🚧 רכיב שמגן על עמודים למשתמשים מחוברים בלבד
 * - בודק האם המשתמש מחובר ב־PocketBase
 * - אם לא מחובר → מפנה לעמוד ההתחברות
 * - אם כן → מציג את התוכן הפנימי (children)
 * - שומר את הנתיב הנוכחי כדי לחזור אליו לאחר ההתחברות
 */
export default function ProtectedRoute({ children }) {
  const isLoggedIn = pb.authStore.isValid && pb.authStore.model;
  const location = useLocation();

  if (!isLoggedIn) {
    // שומר את הנתיב הנוכחי כדי שהמשתמש יוכל לחזור אליו אחרי login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ המשתמש מחובר — מציג את התוכן הפנימי
  return children;
}
