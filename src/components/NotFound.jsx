import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      {/* Fondo animado */}
      <div className="not-found-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      {/* Contenido principal */}
      <div className="not-found-content">
        {/* Ilustración SVG */}
        <div className="not-found-illustration">
          {/* Número 404 grande */}
          <div className="error-code">
            <span className="digit">4</span>
            <div className="compass-container">
              <svg
                className="compass"
                viewBox="0 0 200 200"
                width="200"
                height="200"
              >
                {/* Círculo exterior */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#76C4C5"
                  strokeWidth="3"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E0F7F7"
                  strokeWidth="2"
                />

                {/* Marcas cardinales */}
                <line
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="35"
                  stroke="#76C4C5"
                  strokeWidth="3"
                />
                <line
                  x1="180"
                  y1="100"
                  x2="165"
                  y2="100"
                  stroke="#76C4C5"
                  strokeWidth="3"
                />
                <line
                  x1="100"
                  y1="180"
                  x2="100"
                  y2="165"
                  stroke="#76C4C5"
                  strokeWidth="3"
                />
                <line
                  x1="20"
                  y1="100"
                  x2="35"
                  y2="100"
                  stroke="#76C4C5"
                  strokeWidth="3"
                />

                {/* Aguja de la brújula */}
                <g className="compass-needle">
                  <polygon
                    points="100,50 105,100 100,110 95,100"
                    fill="#EF4444"
                  />
                  <polygon
                    points="100,110 105,100 100,150 95,100"
                    fill="#76C4C5"
                  />
                  <circle cx="100" cy="100" r="8" fill="#374151" />
                  <circle cx="100" cy="100" r="4" fill="white" />
                </g>

                {/* Letras cardinales */}
                <text
                  x="100"
                  y="18"
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="14"
                  fontWeight="bold"
                >
                  N
                </text>
                <text
                  x="185"
                  y="105"
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="14"
                  fontWeight="bold"
                >
                  E
                </text>
                <text
                  x="100"
                  y="195"
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="14"
                  fontWeight="bold"
                >
                  S
                </text>
                <text
                  x="15"
                  y="105"
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="14"
                  fontWeight="bold"
                >
                  O
                </text>
              </svg>
            </div>
            <span className="digit">4</span>
          </div>

          {/* Iconos de carreras flotantes */}
          <div className="career-icons">
            <div className="career-icon icon-1" title="Ciencias">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 2v6m6-6v6M9 18c-4.51 2-5-2-9-2m18 0c-4 0-4.49 4-9 2m-6 2h18v2H3v-2z" />
                <path d="M12 2v16" />
              </svg>
            </div>
            <div className="career-icon icon-2" title="Tecnología">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="career-icon icon-3" title="Arte">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="career-icon icon-4" title="Negocios">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="career-icon icon-5" title="Salud">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="career-icon icon-6" title="Ingeniería">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m5.2-14.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m14.2 5.2l-4.2-4.2m0-6l-4.2-4.2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="not-found-text">
          <h1>¡Ups! Parece que te has perdido</h1>
          <p className="subtitle">
            No encontramos la ruta que buscas, pero no te preocupes, te
            ayudaremos a encontrar tu camino.
          </p>
          <p className="description">
            La página que intentas visitar no existe o ha sido movida. Usa la
            brújula de arriba para orientarte de nuevo.
          </p>

          {/* Botones de acción */}
          <div className="not-found-actions">
            <button className="btn btn-primary" onClick={handleGoHome}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Ir al Inicio
            </button>
            <button className="btn btn-secondary" onClick={handleGoBack}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Volver Atrás
            </button>
          </div>

          {/* Enlaces útiles */}
          <div className="helpful-links">
            <p className="links-title">Si eres estudiante:</p>
            <p
              className="links-description"
              style={{
                fontSize: "0.9rem",
                color: "var(--neutral-600)",
                marginBottom: "1.5rem",
              }}
            >
              Ponte en contacto con tu asesor para que te proporcione un link de
              acceso válido y puedas iniciar tu evaluación.
            </p>
            <div className="links-grid">
              <a href="/login" className="helpful-link">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Acceso para Asesores
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="not-found-footer">
        <p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          ¿Necesitas ayuda? Contacta al administrador del sistema
        </p>
      </div>
    </div>
  );
};

export default NotFound;
