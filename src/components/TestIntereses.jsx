import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TestIntereses.css";
import AlertaPaciencia from "./AlertaPaciencia";

// =====================================================================
// DATOS ESTÁTICOS — hoisted al nivel módulo (rendering-hoist-jsx)
// =====================================================================

// Parte 1: ¿Qué tanto te gustaría? (50 sentencias)
const SENTENCIAS_PARTE1 = [
  "Coleccionar o criar animales",
  "Cuidar plantas, jardines o cultivos",
  "Trabajar en actividades de campo o al aire libre",
  "Usar herramientas o maquinaria para construir cosas",
  "Reparar objetos mecánicos o electrónicos",
  "Realizar actividades físicas que requieran destreza manual",
  "Diseñar planos o estructuras",
  "Conducir vehículos o maquinaria pesada",
  "Participar en actividades deportivas o de aventura",
  "Trabajar con materiales como madera, metal o arcilla",
  "Realizar experimentos científicos en un laboratorio",
  "Investigar causas de enfermedades o fenómenos naturales",
  "Analizar datos estadísticos o gráficos",
  "Estudiar astronomía, biología o química",
  "Leer libros de ciencias o naturaleza",
  "Resolver ecuaciones matemáticas complejas",
  "Programar algoritmos o sistemas informáticos",
  "Estudiar el comportamiento de materiales físicos",
  "Observar y clasificar tipos de plantas o animales",
  "Investigar problemas ambientales o ecológicos",
  "Enseñar o explicar temas a otras personas",
  "Escuchar los problemas de otras personas y ayudarlas",
  "Trabajar como voluntario en actividades sociales",
  "Organizar actividades recreativas o culturales para grupos",
  "Cuidar personas mayores, niños o enfermos",
  "Orientar a otras personas en decisiones importantes",
  "Trabajar en equipos de salud o bienestar",
  "Mediar en conflictos o disputas entre personas",
  "Participar en actividades comunitarias o de servicio social",
  "Resolver necesidades de personas en situación vulnerable",
  "Crear pinturas, dibujos o esculturas",
  "Tocar un instrumento musical o cantar",
  "Escribir cuentos, poemas o artículos creativos",
  "Diseñar carteles, logotipos o páginas web",
  "Actuar en obras de teatro o producciones audiovisuales",
  "Fotografiar o filmar eventos o paisajes",
  "Decorar espacios interiores o diseñar vestuario",
  "Componer música o crear efectos de sonido",
  "Imaginar y crear mundos o historias nuevas",
  "Expresar emociones a través del arte o la danza",
  "Dirigir reuniones o equipos de trabajo",
  "Convencer a otras personas de adoptar ideas o productos",
  "Negociar contratos o acuerdos comerciales",
  "Organizar eventos empresariales o campañas",
  "Tomar decisiones estratégicas para una empresa",
  "Presentar proyectos frente a un grupo de personas",
  "Iniciar un negocio propio o emprendimiento",
  "Liderar proyectos de mejora o innovación",
  "Competir en actividades de ventas o marketing",
  "Gestionar recursos y administrar presupuestos",
];

// Parte 2: ¿Qué tanto te gustaría trabajar como? (10 sentencias)
const SENTENCIAS_PARTE2 = [
  "Ingeniero o técnico en construcción o manufactura",
  "Biólogo, químico o investigador científico",
  "Maestro, psicólogo o trabajador social",
  "Artista, músico, escritor o diseñador",
  "Empresario, gerente o ejecutivo de ventas",
  "Contador, auditor o analista financiero",
  "Médico, enfermero o fisioterapeuta",
  "Programador, desarrollador de software o analista de sistemas",
  "Abogado, juez o servidor público",
  "Chef, diseñador de moda o comunicador",
];

// Todas las sentencias combinadas (60 en total)
const TODAS_SENTENCIAS = [...SENTENCIAS_PARTE1, ...SENTENCIAS_PARTE2];
const TOTAL_PREGUNTAS = TODAS_SENTENCIAS.length; // 60

// Opciones de respuesta (0–4) — hoisted (rendering-hoist-jsx)
const OPCIONES = [
  {
    valor: 0,
    texto: "Me desagrada mucho o totalmente",
    color: "#EF4444",
    emoji: "😣",
  },
  {
    valor: 1,
    texto: "Me desagrada algo o en parte",
    color: "#F97316",
    emoji: "😕",
  },
  { valor: 2, texto: "Me es indiferente", color: "#A3A3A3", emoji: "😐" },
  {
    valor: 3,
    texto: "Me gusta algo o en parte",
    color: "#3B82F6",
    emoji: "🙂",
  },
  { valor: 4, texto: "Me gusta mucho", color: "#10B981", emoji: "😄" },
];

// Mapa de colores por valor para lookup O(1) en el mini-mapa (js-index-maps)
const COLOR_POR_VALOR = new Map(OPCIONES.map((o) => [o.valor, o.color]));

// =====================================================================
// COMPONENTE
// =====================================================================

const TestIntereses = () => {
  const navigate = useNavigate();

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [animando, setAnimando] = useState(false);

  // Estado de hover — necesita re-render para actualizar el borde del botón
  const [hoverOpcion, setHoverOpcion] = useState(null);

  // Bloqueo de transición (evita doble registro)
  const [bloqueando, setBloqueando] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  // Detección de respuesta rápida
  const ultimaRespuestaRef = useRef(null);
  const UMBRAL_MS = 1500;

  // Valores derivados en render (rerender-derived-state-no-effect)
  // preguntaActual es siempre síncrono con el render; Object.keys(respuestas)
  // puede estar un ciclo por detrás debido al batching de React.
  const preguntasRespondidas = preguntaActual;
  const progresoTotal = (preguntasRespondidas / TOTAL_PREGUNTAS) * 100;
  const esParte1 = preguntaActual < 50;
  const sentenciaActual = TODAS_SENTENCIAS[preguntaActual];
  const respuestaActual = respuestas[preguntaActual];
  const seccionLabel = esParte1
    ? "¿Qué tanto te gustaría...?"
    : "¿Qué tanto te gustaría trabajar como...?";

  // ---------------------------------------------------------------
  // Dispara la transición sutil de fade al cambiar de pregunta
  const avanzarConTransicion = (siguiente) => {
    setAnimando(true);
    setTimeout(() => {
      siguiente();
      setTimeout(() => setAnimando(false), 50);
    }, 180); // fade-out rápido (sutil)
  };

  // ---------------------------------------------------------------
  const handleRespuesta = (valor) => {
    if (bloqueando) return;

    const ahora = Date.now();
    if (
      ultimaRespuestaRef.current !== null &&
      ahora - ultimaRespuestaRef.current < UMBRAL_MS
    ) {
      setMostrarAlerta(true);
      return;
    }
    ultimaRespuestaRef.current = ahora;

    setBloqueando(true);

    const respuestasActualizadas = { ...respuestas, [preguntaActual]: valor };
    setRespuestas(respuestasActualizadas);

    setTimeout(() => {
      if (preguntaActual < TOTAL_PREGUNTAS - 1) {
        avanzarConTransicion(() => {
          setPreguntaActual((p) => p + 1);
          setBloqueando(false);
        });
      } else {
        calcularResultados(respuestasActualizadas);
      }
    }, 600);
  };

  // ---------------------------------------------------------------
  // Recibe el mapa completo para evitar stale closure en la última respuesta
  const calcularResultados = (todasLasRespuestas) => {
    const totalPuntaje = Object.values(todasLasRespuestas).reduce(
      (acc, val) => acc + val,
      0,
    );

    localStorage.setItem(
      "resultadosIntereses",
      JSON.stringify({
        respuestas: todasLasRespuestas,
        totalPuntaje,
        parte1: SENTENCIAS_PARTE1.map((s, i) => ({
          sentencia: s,
          valor: todasLasRespuestas[i] ?? null,
        })),
        parte2: SENTENCIAS_PARTE2.map((s, i) => ({
          sentencia: s,
          valor: todasLasRespuestas[50 + i] ?? null,
        })),
      }),
    );

    setMostrarResultados(true);
  };

  // ---------------------------------------------------------------
  const handleRetroceder = () => {
    if (preguntaActual > 0) {
      avanzarConTransicion(() => setPreguntaActual((p) => p - 1));
    }
  };

  const handleContinuar = () => {
    navigate("/evaluado/test-aptitudes");
  };

  // ---------------------------------------------------------------
  // Pantalla de completado
  // ---------------------------------------------------------------
  if (mostrarResultados) {
    return (
      <div className="test-intereses-container">
        <AlertaPaciencia
          visible={mostrarAlerta}
          onClose={() => setMostrarAlerta(false)}
        />
        <div className="test-completado-intereses">
          <div className="completado-icon-intereses">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1>¡Test Completado!</h1>
          <p>Has respondido todas las preguntas del perfil de intereses.</p>
          <p className="completado-stats-intereses">
            <strong>{TOTAL_PREGUNTAS}</strong> preguntas respondidas
          </p>
          <p className="leyenda-institucional leyenda-completado">
            Banco de preguntas provisto y avalado por COEPESEO y CGEMSySCyT.
          </p>
          <button
            className="btn btn-primary btn-intereses"
            onClick={handleContinuar}
          >
            Continuar
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------
  // Test principal
  // ---------------------------------------------------------------
  return (
    <div className="test-intereses-container">
      <AlertaPaciencia
        visible={mostrarAlerta}
        onClose={() => setMostrarAlerta(false)}
      />
      {/* Header con progreso */}
      <div className="intereses-header">
        <div className="intereses-header-top">
          <div className="intereses-test-info">
            <h2>Perfil de Intereses</h2>
          </div>
          <div className="intereses-progreso-total">
            <div className="intereses-progreso-texto">
              <span>
                {preguntasRespondidas} de {TOTAL_PREGUNTAS}
              </span>
              <span className="intereses-progreso-pct">
                {Math.round(progresoTotal)}%
              </span>
            </div>
            <div className="intereses-progreso-bar">
              <div
                className="intereses-progreso-fill"
                style={{ width: `${progresoTotal}%` }}
              />
            </div>
          </div>
        </div>

        {/* Indicador de sección */}
        <div className="intereses-seccion-badges">
          <div
            className={`intereses-seccion-badge ${esParte1 ? "active" : "done"}`}
          >
            {esParte1 ? (
              <span className="badge-dot badge-dot-active" />
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            Actividades (50)
          </div>
          <div className="intereses-seccion-connector" />
          <div
            className={`intereses-seccion-badge ${!esParte1 ? "active" : "pending"}`}
          >
            {/* rendering-conditional-render: ternario en lugar de && */}
            {!esParte1 ? <span className="badge-dot badge-dot-active" /> : null}
            Profesiones (10)
          </div>
        </div>
      </div>

      {/* Contenido principal — fade por pregunta */}
      <div className={`intereses-content ${animando ? "animando" : ""}`}>
        {/* Card unificada: número + sección + sentencia + opciones */}
        <div className="intereses-pregunta-card">
          <div className="intereses-card-meta">
            <span className="intereses-pregunta-numero">
              {preguntaActual + 1} / {TOTAL_PREGUNTAS}
            </span>
            <span className="intereses-seccion-label">{seccionLabel}</span>
          </div>
          <h3 className="intereses-pregunta-texto">{sentenciaActual}</h3>
        </div>

        {/* Opciones de respuesta */}
        <div className="intereses-opciones">
          {OPCIONES.map((opcion) => {
            const seleccionada = respuestaActual === opcion.valor;
            const enHover = hoverOpcion === opcion.valor;
            return (
              <button
                key={opcion.valor}
                className={`intereses-opcion-btn ${seleccionada ? "selected" : ""}`}
                onClick={() => handleRespuesta(opcion.valor)}
                onMouseEnter={() => setHoverOpcion(opcion.valor)}
                onMouseLeave={() => setHoverOpcion(null)}
                style={{
                  "--opcion-color": opcion.color,
                  borderColor:
                    seleccionada || enHover ? opcion.color : undefined,
                  backgroundColor: seleccionada
                    ? `${opcion.color}18`
                    : undefined,
                }}
              >
                <span
                  className="intereses-opcion-valor"
                  style={{ backgroundColor: opcion.color }}
                >
                  {opcion.valor}
                </span>
                <span className="intereses-opcion-emoji">{opcion.emoji}</span>
                <span className="intereses-opcion-texto">{opcion.texto}</span>
                {/* rendering-conditional-render: ternario en lugar de && */}
                {seleccionada ? (
                  <svg
                    className="intereses-check"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Navegación */}
        <div className="intereses-navigation">
          <button
            className="btn btn-secondary"
            onClick={handleRetroceder}
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Anterior
          </button>
          <span className="intereses-nav-hint">
            Selecciona una opción para continuar
          </span>
        </div>
      </div>

      {/* Mini-mapa de preguntas */}
      <div className="intereses-minimap">
        {TODAS_SENTENCIAS.map((_, i) => {
          const respondida = respuestas[i] !== undefined;
          const actual = i === preguntaActual;
          // O(1) lookup con Map (js-index-maps)
          const opcionColor = respondida
            ? COLOR_POR_VALOR.get(respuestas[i])
            : undefined;

          return (
            <div
              key={i}
              className={`minimap-dot ${respondida ? "respondida" : ""} ${actual ? "actual" : ""} ${i === 50 ? "minimap-separator" : ""}`}
              style={
                actual
                  ? { backgroundColor: "#6366F1", transform: "scale(1.5)" }
                  : respondida
                    ? { backgroundColor: opcionColor }
                    : {}
              }
              title={`Sentencia ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Pie de página institucional */}
      <footer className="leyenda-footer">
        <p className="leyenda-institucional">
          Banco de preguntas provisto y avalado por COEPESEO y CGEMSySCyT.
        </p>
      </footer>
    </div>
  );
};

export default TestIntereses;
