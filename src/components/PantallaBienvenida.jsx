import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PantallaBienvenida.css";

const PantallaBienvenida = () => {
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState("");

  useEffect(() => {
    // Obtener datos del evaluado desde sessionStorage
    const datosGuardados = sessionStorage.getItem("datosEvaluado");
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      setNombreCompleto(datos.nombreCompleto || "Evaluado");
    } else {
      // Si no hay datos, redirigir al registro
      navigate("/evaluado/registro");
    }
  }, [navigate]);

  // Extraer el primer nombre
  const primerNombre = nombreCompleto.split(" ")[0];

  const handleComenzar = () => {
    navigate("/evaluado/test");
  };

  return (
    <div className="pantalla-bienvenida">
      <div className="bienvenida-container">
        {/* Ilustración decorativa */}
        <div className="bienvenida-ilustracion">
          <div className="ilustracion-circle circle-1"></div>
          <div className="ilustracion-circle circle-2"></div>
          <div className="ilustracion-circle circle-3"></div>
          <div className="ilustracion-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
        </div>

        {/* Contenido */}
        <div className="bienvenida-content">
          <h1 className="bienvenida-titulo">¡Bienvenido, {primerNombre}!</h1>

          <div className="bienvenida-texto">
            <p>
              Estás a punto de realizar el{" "}
              <strong>Test de Orientación Vocacional</strong> que te ayudará a
              descubrir tus intereses, habilidades y las carreras que mejor se
              adaptan a tu perfil.
            </p>

            <div className="instrucciones-card">
              <div className="instrucciones-header">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <h3>Instrucciones</h3>
              </div>

              <ul className="instrucciones-lista">
                <li>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    El test consta de <strong>20 preguntas</strong> sobre tus
                    intereses y preferencias
                  </span>
                </li>
                <li>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    No hay respuestas correctas o incorrectas, sé{" "}
                    <strong>honesto contigo mismo</strong>
                  </span>
                </li>
                <li>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    Tómate tu tiempo para <strong>reflexionar</strong> antes de
                    responder
                  </span>
                </li>
                <li>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    Si necesitas ayuda, usa el{" "}
                    <strong>botón de asistencia</strong> en cualquier momento
                  </span>
                </li>
                <li>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    Al finalizar, recibirás un{" "}
                    <strong>reporte personalizado</strong> con tus resultados
                  </span>
                </li>
              </ul>
            </div>

            <div className="tiempo-estimado">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Tiempo estimado: <strong>15-20 minutos</strong>
              </span>
            </div>
          </div>

          <div className="bienvenida-acciones">
            <button className="btn btn-primary btn-lg" onClick={handleComenzar}>
              Comenzar Test
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <p className="texto-ayuda">
              ¿Tienes dudas? Contacta a tu asesor antes de comenzar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaBienvenida;
