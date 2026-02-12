import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VistaEvaluado.css";

const VistaEvaluado = () => {
  const navigate = useNavigate();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [datosEvaluado, setDatosEvaluado] = useState(null);

  useEffect(() => {
    // Obtener datos del evaluado desde sessionStorage
    const datosGuardados = sessionStorage.getItem("datosEvaluado");
    if (datosGuardados) {
      setDatosEvaluado(JSON.parse(datosGuardados));
    } else {
      // Si no hay datos, redirigir al registro
      navigate("/evaluado/registro");
    }
  }, [navigate]);

  // Datos de ejemplo del test
  const test = {
    titulo: "Test de Orientación Vocacional",
    totalPreguntas: 20,
    preguntas: [
      {
        id: 1,
        texto: "¿Te gusta trabajar con números y realizar cálculos complejos?",
        opciones: [
          { id: "a", texto: "Totalmente en desacuerdo", valor: 1 },
          { id: "b", texto: "En desacuerdo", valor: 2 },
          { id: "c", texto: "Neutral", valor: 3 },
          { id: "d", texto: "De acuerdo", valor: 4 },
          { id: "e", texto: "Totalmente de acuerdo", valor: 5 },
        ],
      },
      {
        id: 2,
        texto: "¿Disfrutas ayudando a otras personas a resolver sus problemas?",
        opciones: [
          { id: "a", texto: "Totalmente en desacuerdo", valor: 1 },
          { id: "b", texto: "En desacuerdo", valor: 2 },
          { id: "c", texto: "Neutral", valor: 3 },
          { id: "d", texto: "De acuerdo", valor: 4 },
          { id: "e", texto: "Totalmente de acuerdo", valor: 5 },
        ],
      },
      {
        id: 3,
        texto:
          "¿Te interesa el diseño y la creación de cosas visualmente atractivas?",
        opciones: [
          { id: "a", texto: "Totalmente en desacuerdo", valor: 1 },
          { id: "b", texto: "En desacuerdo", valor: 2 },
          { id: "c", texto: "Neutral", valor: 3 },
          { id: "d", texto: "De acuerdo", valor: 4 },
          { id: "e", texto: "Totalmente de acuerdo", valor: 5 },
        ],
      },
      // Más preguntas...
    ],
  };

  const pregunta = test.preguntas[preguntaActual];
  const progreso = ((preguntaActual + 1) / test.totalPreguntas) * 100;

  const handleSeleccionarRespuesta = (opcionId) => {
    setRespuestas({
      ...respuestas,
      [pregunta.id]: opcionId,
    });
  };

  const handleSiguiente = () => {
    if (preguntaActual < test.preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    }
  };

  const handleAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const handleFinalizar = () => {
    console.log("Test finalizado", respuestas);
    // Aquí iría la lógica para enviar las respuestas al backend
    // Navegar a la pantalla de finalización
    navigate("/evaluado/finalizado");
  };

  const handleSolicitarAyuda = () => {
    setMostrarAyuda(true);
    console.log("Solicitando ayuda al asesor...");
    // Aquí iría la lógica para notificar al asesor
  };

  const respuestaSeleccionada = respuestas[pregunta.id];
  const puedeAvanzar = respuestaSeleccionada !== undefined;

  return (
    <div className="vista-evaluado">
      {/* Barra de Progreso Superior */}
      <div className="progress-bar-top">
        <div
          className="progress-bar-fill"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      {/* Contenedor Principal */}
      <div className="test-container">
        {/* Header Minimalista */}
        <header className="test-header">
          <div className="test-info">
            <h1 className="test-titulo">{test.titulo}</h1>
            <p className="test-subtitulo">
              Pregunta {preguntaActual + 1} de {test.totalPreguntas}
            </p>
          </div>
          <div className="test-progress-indicator">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="var(--neutral-200)"
                strokeWidth="4"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - progreso / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 24 24)"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
              <text
                x="24"
                y="24"
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--accent-primary)"
                fontSize="12"
                fontWeight="700"
              >
                {Math.round(progreso)}%
              </text>
            </svg>
          </div>
        </header>

        {/* Pregunta */}
        <div className="pregunta-section">
          <div className="pregunta-card">
            <div className="pregunta-numero">
              <span>#{pregunta.id}</span>
            </div>
            <h2 className="pregunta-texto">{pregunta.texto}</h2>
          </div>
        </div>

        {/* Opciones de Respuesta */}
        <div className="opciones-section">
          <div className="opciones-grid">
            {pregunta.opciones.map((opcion) => (
              <button
                key={opcion.id}
                className={`opcion-card ${respuestaSeleccionada === opcion.id ? "opcion-selected" : ""}`}
                onClick={() => handleSeleccionarRespuesta(opcion.id)}
              >
                <div className="opcion-radio">
                  <div className="opcion-radio-inner"></div>
                </div>
                <div className="opcion-content">
                  <span className="opcion-letra">
                    {opcion.id.toUpperCase()}
                  </span>
                  <span className="opcion-texto">{opcion.texto}</span>
                </div>
                <div className="opcion-check">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div className="navegacion-section">
          <button
            className="btn btn-secondary"
            onClick={handleAnterior}
            disabled={preguntaActual === 0}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Anterior
          </button>

          <div className="navegacion-indicadores">
            {Array.from({ length: test.totalPreguntas }).map((_, index) => (
              <div
                key={index}
                className={`indicador-dot ${index === preguntaActual ? "indicador-active" : ""} ${respuestas[index + 1] !== undefined ? "indicador-completed" : ""}`}
                onClick={() => setPreguntaActual(index)}
              ></div>
            ))}
          </div>

          {preguntaActual < test.preguntas.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={handleSiguiente}
              disabled={!puedeAvanzar}
            >
              Siguiente
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
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleFinalizar}
              disabled={!puedeAvanzar}
            >
              Finalizar Test
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
            </button>
          )}
        </div>
      </div>

      {/* Botón Flotante de Ayuda */}
      <button
        className="help-button"
        onClick={handleSolicitarAyuda}
        title="Solicitar ayuda al asesor"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>

      {/* Modal de Ayuda */}
      {mostrarAyuda && (
        <div className="modal-overlay" onClick={() => setMostrarAyuda(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Solicitud de Ayuda Enviada</h3>
              <button
                className="modal-close"
                onClick={() => setMostrarAyuda(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p>
                Tu solicitud ha sido enviada al asesor. Recibirás asistencia en
                breve.
              </p>
              <p className="text-sm text-neutral-500">
                Puedes continuar con el test mientras esperas.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setMostrarAyuda(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaEvaluado;
