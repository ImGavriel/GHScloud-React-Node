// server/index.js
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";

// --- הגדרת נתיבים בסיסיים ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// --- מידלוורים ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// --- מסלול בדיקה ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "✅ GHS server is running fine" });
});

// --- הגשת אתר React מתוך dist ---
const clientBuildPath = path.join(__dirname, "../dist");
app.use(express.static(clientBuildPath));

// --- טיפול בכל שאר הנתיבים (Express 5 – חובה עם app.use) ---
app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// --- הרצת השרת ---
app.listen(PORT, () => {
  console.log(`🌐 GHS server running at http://localhost:${PORT}`);
});
