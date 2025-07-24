import React from "react";
import ComparisonTable from "../components/ComparisonTable";

const MEGA_PACKS = [
  {
    title: "Tech Pro",
    price: 400,
    includes: ["Tech Total", "Desarrollo Web & Apps", "Ciberseguridad"]
  },
  {
    title: "Creador Digital",
    price: 400,
    includes: ["Marketing 360°", "Multimedia & Diseño", "Librería Digital"]
  },
  {
    title: "Mind & Growth",
    price: 400,
    includes: ["Psicología & Neurociencia", "Desarrollo Personal", "Educación Académica"]
  },
  {
    title: "Práctico Total",
    price: 400,
    includes: ["Idiomas", "Habilidades Manuales", "Gastronomía"]
  }
];

export default function MegaPacks() {
  const waLink = (msg) =>
    `https://wa.me/5212321443592?text=${encodeURIComponent(msg)}`;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Mega Packs</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "1rem",
          margin: "2rem 0"
        }}
      >
        {MEGA_PACKS.map((pack) => (
          <div
            key={pack.title}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ padding: "1rem", background: "#f9f9f9" }}>
              <h2>{pack.title}</h2>
              <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>
                ${pack.price} MXN
              </p>
              <ul style={{ margin: "0.5rem 0 1rem", paddingLeft: "1.2rem" }}>
                {pack.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href={waLink(`Hola, quiero el Mega Pack ${pack.title}`)}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
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
          </div>
        ))}
      </div>

      <h2>Comparativa de planes</h2>
      <ComparisonTable />

      <div style={{ margin: "2rem 0" }}>
        <a
          href={waLink("Hola, quiero todos los cursos al paquete completo")}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            background: "#25D366",
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "1rem"
          }}
        >
          Quiero Todos los Cursos
        </a>
      </div>
    </div>
  );
}