import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CloudScene from "../components/CloudScene";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-clouds">
        <CloudScene />
      </div>
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
}
