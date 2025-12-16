import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import useTheme from "../hooks/useTheme";
import "./Profile.css";

export default function Profile() {
  useTheme();
  const navigate = useNavigate();
  const user = pb.authStore.model;
  const [showEdit, setShowEdit] = useState(false);
  const [service, setService] = useState(null);
  const [roles, setRoles] = useState({});

  /** 🧠 טוען נתוני משתמש מה־PocketBase */
  const loadUserData = async (id) => {
    const controller = new AbortController();
    try {
      const record = await pb.collection("users").getOne(id, {
        signal: controller.signal,
      });
      setService({
        planLevel: record.planLevel ?? 0,
        sitesUsed: record.sitesUsed ?? 0,
        sitesLimit: record.sitesLimit ?? 0,
        planActive: record.planActive ?? false,
        storageUsed: record.storageUsed ?? 0,
        storageLimit: record.storageLimit ?? 10,
      });
      setRoles({
        vip: record.vip,
        admin: record.admin,
        owner: record.owner,
        partner: record.partner,
        betaTester: record.betaTester,
        developer: record.developer,
        supportAgent: record.supportAgent,
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("⚠️ שגיאה בטעינת נתוני המשתמש:", err);
      }
    }
    return () => controller.abort();
  };

  useEffect(() => {
    if (!user) return;

    // 🚀 טעינה ראשונית
    loadUserData(user.id);

    // ✅ האזנה בזמן אמת (Realtime subscription)
    pb.collection("users").subscribe(user.id, (e) => {
      console.log("📡 שינוי בזמן אמת:", e.record);
      setService({
        planLevel: e.record.planLevel ?? 0,
        sitesUsed: e.record.sitesUsed ?? 0,
        sitesLimit: e.record.sitesLimit ?? 0,
        planActive: e.record.planActive ?? false,
        storageUsed: e.record.storageUsed ?? 0,
        storageLimit: e.record.storageLimit ?? 10,
      });
      setRoles({
        vip: e.record.vip,
        admin: e.record.admin,
        owner: e.record.owner,
        partner: e.record.partner,
        betaTester: e.record.betaTester,
        developer: e.record.developer,
        supportAgent: e.record.supportAgent,
      });
    });

    // 🧹 ביטול האזנה כשעוזבים את העמוד
    return () => {
      pb.collection("users").unsubscribe(user.id);
    };
  }, [user]);

  // אם אין משתמש מחובר
  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card glass">
          <p>❌ לא נמצא משתמש מחובר</p>
          <button className="btn primary" onClick={() => navigate("/login")}>
            🔑 התחברות
          </button>
        </div>
      </div>
    );
  }

  // אם הנתונים עדיין נטענים
  if (!service) {
    return (
      <div className="profile-page">
        <div className="profile-card glass">
          <p>⏳ טוען נתונים...</p>
        </div>
      </div>
    );
  }

  // שלבי התכניות
  const stages = [
    { level: 0, maxSites: 0, label: "אין תוכנית פעילה", color: "#999" },
    { level: 1, maxSites: 5, label: "שלב 1 – עד 5 אתרים", color: "#00e5ff" },
    { level: 2, maxSites: 10, label: "שלב 2 – עד 10 אתרים", color: "#00bfa6" },
    { level: 3, maxSites: 15, label: "שלב 3 – עד 15 אתרים", color: "#7b61ff" },
  ];

  const currentStage =
    stages.find((s) => service.planLevel === s.level) || stages[0];
  const nextStage =
    stages.find((s) => s.level === currentStage.level + 1) || null;

  const progress =
    currentStage.maxSites > 0
      ? (service.sitesUsed / currentStage.maxSites) * 100
      : 0;

  const avatarUrl = user?.avatar
    ? pb.files.getUrl(user, user.avatar)
    : "/images/default-avatar.png";

  return (
    <div className="profile-page">
      <div className="animated-bg" />

      <div className="profile-container fade-in">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img src={avatarUrl} alt="avatar" className="avatar-img" />
          </div>
          <div className="profile-basic">
            <h1>{user.name || "משתמש חדש"}</h1>
            <p className="email">{user.email}</p>

            {/* BADGES */}
            <div className="badges">
              {roles.owner && <span className="badge owner">👑 Owner</span>}
              {roles.admin && <span className="badge admin">🛠️ Admin</span>}
              {roles.vip && <span className="badge vip">💎 VIP</span>}
              {roles.partner && (
                <span className="badge partner">🤝 Partner</span>
              )}
              {roles.developer && (
                <span className="badge developer">💻 Developer</span>
              )}
              {roles.betaTester && (
                <span className="badge beta">🧪 Beta Tester</span>
              )}
              {roles.supportAgent && (
                <span className="badge support">🎧 Support</span>
              )}
            </div>

            {/* STATUS */}
            <div className="badges status-tags">
              <span
                className={`badge ${service.planActive ? "active" : "inactive"}`}
              >
                {service.planActive ? "שירות פעיל ✅" : "לא פעיל ❌"}
              </span>
              <span className="badge plan">{currentStage.label}</span>
            </div>
          </div>
        </div>

        {/* BIO */}
        <div className="bio-section">
          <h2>💬 תיאור אישי</h2>
          <p>
            {user.bio ||
              "אין תיאור עדיין. תוכל להוסיף מידע אישי, תחומי עניין או מטרות עסקיות."}
          </p>
        </div>

        {/* PLAN SYSTEM */}
        <div className="stage-section">
          <h2>🚀 רמת שירות</h2>
          <div className="stage-card">
            <h3>{currentStage.label}</h3>

            {currentStage.maxSites > 0 ? (
              <>
                <p>
                  {service.sitesUsed} מתוך {currentStage.maxSites} אתרים
                </p>
                <div className="progress-bar big">
                  <div
                    className="progress"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: `linear-gradient(90deg, ${currentStage.color}, var(--accent))`,
                    }}
                  ></div>
                </div>

                <p className="storage-text">
                  🧠 אחסון: {service.storageUsed}GB מתוך{" "}
                  {service.storageLimit}GB
                </p>

                {nextStage ? (
                  <p className="next-stage">
                    🔓 השלב הבא: תוכנית {nextStage.level} – עד{" "}
                    {nextStage.maxSites} אתרים
                  </p>
                ) : (
                  <p className="next-stage">🏆 הגעת לשלב הגבוה ביותר!</p>
                )}
              </>
            ) : (
              <p>החשבון שלך טרם כולל תוכנית שירות פעילה.</p>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="profile-actions">
          <button className="btn primary" onClick={() => navigate("/settings")}>
  ✏️ עריכת פרופיל
</button>

          <button
            className="btn secondary"
            onClick={() => navigate("/dashboard")}
          >
            🧭 לוח בקרה
          </button>
          <button
            className="btn danger"
            onClick={() => {
              pb.authStore.clear();
              navigate("/login");
            }}
          >
            🚪 התנתק
          </button>
        </div>

        <footer className="footer">
          © {new Date().getFullYear()} GHS Cloud Hosting
        </footer>
      </div>

      {/* MODAL */}
      {showEdit && (
        <div className="edit-modal">
          <div className="edit-card glass">
            <h2>⚙️ עריכת פרופיל</h2>
            <p>בקרוב תוכל לשנות תמונה, תיאור ותוכנית השירות שלך.</p>
            <button className="btn close" onClick={() => setShowEdit(false)}>
              ✖ סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
