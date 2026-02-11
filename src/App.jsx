import { useState } from "react";
import DashboardAsesor from "./components/DashboardAsesor";
import FormularioRegistro from "./components/FormularioRegistro";
import PantallaBienvenida from "./components/PantallaBienvenida";
import VistaEvaluado from "./components/VistaEvaluado";
import "./App.css";

function App() {
  const [vistaActual, setVistaActual] = useState("asesor"); // 'asesor' o 'evaluado'
  const [pasoEvaluado, setPasoEvaluado] = useState("formulario"); // 'formulario', 'bienvenida', 'test'
  const [datosEvaluado, setDatosEvaluado] = useState(null);

  // Handler cuando el evaluado completa el formulario
  const handleFormularioCompleto = (datos) => {
    setDatosEvaluado(datos);
    setPasoEvaluado("bienvenida");
  };

  // Handler cuando el evaluado comienza el test
  const handleComenzarTest = () => {
    setPasoEvaluado("test");
  };

  // Renderizar la vista del evaluado según el paso actual
  const renderVistaEvaluado = () => {
    switch (pasoEvaluado) {
      case "formulario":
        return <FormularioRegistro onComplete={handleFormularioCompleto} />;
      case "bienvenida":
        return (
          <PantallaBienvenida
            nombreCompleto={datosEvaluado.nombreCompleto}
            onComenzar={handleComenzarTest}
          />
        );
      case "test":
        return <VistaEvaluado datosEvaluado={datosEvaluado} />;
      default:
        return <FormularioRegistro onComplete={handleFormularioCompleto} />;
    }
  };

  return (
    <div className="app">
      {/* Selector de Vista (solo para demo) */}
      <div className="vista-selector">
        <button
          className={`selector-btn ${vistaActual === "asesor" ? "selector-btn-active" : ""}`}
          onClick={() => {
            setVistaActual("asesor");
            // Resetear el flujo del evaluado cuando cambiamos de vista
            setPasoEvaluado("formulario");
            setDatosEvaluado(null);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard Asesor
        </button>
        <button
          className={`selector-btn ${vistaActual === "evaluado" ? "selector-btn-active" : ""}`}
          onClick={() => setVistaActual("evaluado")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Flujo Evaluado
        </button>
      </div>

      {/* Renderizado Condicional */}
      {vistaActual === "asesor" ? <DashboardAsesor /> : renderVistaEvaluado()}
    </div>
  );
}

export default App;
