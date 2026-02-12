import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PantallaFinalizada.css";

const PantallaFinalizada = () => {
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
  const primerNombre = nombreCompleto
    ? nombreCompleto.split(" ")[0]
    : "Evaluado";

  return (
    <div className="pantalla-finalizada">
      <div className="finalizada-container">
        {/* Animación de éxito */}
        <div className="success-animation">
          <div className="success-circle circle-outer"></div>
          <div className="success-circle circle-middle"></div>
          <div className="success-circle circle-inner"></div>
          <div className="success-checkmark">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Contenido */}
        <div className="finalizada-content">
          <h1 className="finalizada-titulo">
            ¡Excelente trabajo, {primerNombre}!
          </h1>

          <p className="finalizada-mensaje">
            Has completado exitosamente el{" "}
            <strong>Test de Orientación Vocacional</strong>.
          </p>

          <div className="finalizada-info-card">
            <div className="info-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <div className="info-text">
              <h3>¿Qué sigue ahora?</h3>
              <p>
                Tu asesor está revisando tus respuestas y preparando un{" "}
                <strong>reporte personalizado</strong> con recomendaciones de
                carreras que se ajustan a tu perfil, intereses y habilidades.
              </p>
            </div>
          </div>

          <div className="finalizada-pasos">
            <div className="paso-item">
              <div className="paso-numero">1</div>
              <div className="paso-contenido">
                <h4>Análisis de Resultados</h4>
                <p>
                  Procesaremos tus respuestas para identificar tus áreas de
                  interés
                </p>
              </div>
            </div>

            <div className="paso-item">
              <div className="paso-numero">2</div>
              <div className="paso-contenido">
                <h4>Reporte Personalizado</h4>
                <p>Recibirás un reporte detallado con carreras recomendadas</p>
              </div>
            </div>

            <div className="paso-item">
              <div className="paso-numero">3</div>
              <div className="paso-contenido">
                <h4>Asesoría Individual</h4>
                <p>Tu asesor te contactará para discutir los resultados</p>
              </div>
            </div>
          </div>

          <div className="finalizada-mensaje-final">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p>
              Gracias por tu tiempo y honestidad al responder.
              <br />
              ¡Te deseamos mucho éxito en tu futuro académico y profesional!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaFinalizada;
