import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginAsesor from "./components/LoginAsesor";
import DashboardAsesor from "./components/DashboardAsesor";
import FormularioRegistro from "./components/FormularioRegistro";
import NotFound from "./components/NotFound";
import TestPersonalidad from "./components/TestPersonalidad";
import "./App.css";

// Componente para proteger rutas del asesor
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("asesorAuth");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal - redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login del Asesor */}
        <Route path="/login" element={<LoginAsesor />} />

        {/* Dashboard del Asesor (Protegido) */}
        <Route
          path="/asesor"
          element={
            <ProtectedRoute>
              <DashboardAsesor />
            </ProtectedRoute>
          }
        />

        {/* Flujo del Evaluado */}
        <Route
          path="/evaluado"
          element={<Navigate to="/evaluado/registro" replace />}
        />
        <Route path="/evaluado/registro" element={<FormularioRegistro />} />
        <Route
          path="/evaluado/test-personalidad"
          element={<TestPersonalidad />}
        />

        {/* Ruta 404 - Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
