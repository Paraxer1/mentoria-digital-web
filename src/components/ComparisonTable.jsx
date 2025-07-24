import React from "react";

const ComparisonTable = () => (
  <div style={{ overflowX: "auto", margin: "2rem 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ background: "#f0f0f0" }}>
        <tr>
          <th style={th}>Característica</th>
          <th style={th}>Curso Individual</th>
          <th style={th}>Mega Pack (3 cursos)</th>
          <th style={th}>Todos los Cursos (12)</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["Acceso inmediato", "✅", "✅", "✅"],
          ["Cantidad de cursos", "1", "3", "12"],
          ["Ahorro vs. precio individual", "—", "✅ $140", "—"],
          ["Actualizaciones", "—", "✅", "✅"],
          ["Soporte personalizado", "✅", "✅", "✅"],
        ].map((row, i) => (
          <tr key={i} style={i % 2 ? { background: "#fafafa" } : {}}>
            {row.map((cell, j) => (
              <td key={j} style={td}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const th = {
  padding: "0.75rem",
  border: "1px solid #ddd",
  textAlign: "left"
};

const td = {
  padding: "0.75rem",
  border: "1px solid #ddd"
};

export default ComparisonTable;