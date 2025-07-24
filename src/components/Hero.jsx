// src/components/Hero.jsx
import React from "react";

export default function Hero({ title, subtitle, backgroundUrl, ctaText, ctaLink }) {
  const style = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    padding: "4rem 2rem",
    textAlign: "center",
    position: "relative"
  };
  const overlay = {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)"
  };
  const content = {
    position: "relative",
    zIndex: 1
  };
  return (
    <div style={style}>
      <div style={overlay}></div>
      <div style={content}>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg mb-6">{subtitle}</p>}
        {ctaText && (
          <a
            href={ctaLink}
            className="inline-block px-6 py-3 bg-blue-600 rounded-full font-semibold"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
}