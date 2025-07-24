import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/mega-packs">Mega Packs</Link> |{" "}
      <Link to="/todos-los-cursos">Todos los Cursos</Link> |{" "}
      <a href="https://wa.me/5212321443592" target="_blank" rel="noreferrer">
        ¿Tienes dudas?
      </a>
    </nav>
  );
}