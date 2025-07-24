import React from "react";

const CURSOS = [
  { title: "Tech Total", price: 180 },
  { title: "Marketing 360°", price: 180 },
  { title: "Multimedia & Diseño", price: 180 },
  { title: "Educación Académica", price: 180 },
  { title: "Psicología & Neurociencia", price: 180 },
  { title: "Desarrollo Personal & Mentalidad", price: 180 },
  { title: "Librería Digital", price: 180 },
  { title: "Idiomas, Pasiones y Finanzas", price: 180 },
  { title: "Habilidades y Manualidades", price: 180 },
  { title: "Gastronomía Completa", price: 180 },
  { title: "Ciberseguridad & Hacking Ético", price: 180 },
  { title: "Desarrollo Web & Apps", price: 180 }
];

export default function Catalogo() {
  const waLink = (curso) =>
    `https://wa.me/5212321443592?text=${encodeURIComponent(
      `Hola, quiero el curso ${curso}`
    )}`;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Catálogo de Cursos</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
          marginTop: "1rem"
        }}
      >
        {CURSOS.map(({ title, price }) => (
          <div
            key={title}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{title}</h3>
            <p style={{ fontWeight: "bold" }}>${price} MXN</p>
            <a
              href={waLink(title)}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#25D366",
                color: "#fff",
                borderRadius: "4px",
                textDecoration: "none"
              }}
            >
              Comprar por WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}