// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CouponBanner from "./components/CouponBanner";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import MegaPacks from "./pages/MegaPacks";
import TodosLosCursos from "./pages/TodosLosCursos";
import About from "./pages/About";

function App() {
  return (
    <Router>
      {/* Barra de navegación fija */}
      <Navbar />

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/mega-packs" element={<MegaPacks />} />
        <Route path="/todos-los-cursos" element={<TodosLosCursos />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
