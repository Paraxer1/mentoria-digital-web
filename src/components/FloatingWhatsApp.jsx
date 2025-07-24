// src/components/FloatingWhatsApp.jsx
import React from "react";

export default function FloatingWhatsApp() {
  const style = {
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    background: "#25D366",
    color: "#fff",
    borderRadius: "50%",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    textDecoration: "none",
    fontSize: "1.5rem",
    zIndex: 1000
  };
  return (
    <a
      href="https://wa.me/5212321443592"
      target="_blank"
      rel="noreferrer"
      style={style}
      title="¿Tienes alguna duda?"
    >
      💬
    </a>
  );
}