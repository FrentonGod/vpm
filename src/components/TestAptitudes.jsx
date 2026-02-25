import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TestAptitudes.css";
import AlertaPaciencia from "./AlertaPaciencia";

// =====================================================================
// DATOS ESTÁTICOS — hoisted al nivel módulo (rendering-hoist-jsx)
// =====================================================================

// Área 1: Aptitud Verbal (10 preguntas)
const APTITUD_VERBAL = [
  "Expresarme con claridad y fluidez al hablar en público",
  "Redactar textos escritos de forma correcta y ordenada",
  "Comprender textos complejos o técnicos con facilidad",
  "Aprender vocabulario nuevo en otro idioma rápidamente",
  "Resumir las ideas principales de un texto extenso",
  "Debatir y argumentar mis opiniones de forma convincente",
  "Escribir de forma creativa (cuentos, ensayos, reportes)",
  "Narrar o contar historias que capten la atención",
  "Detectar el tono o intención detrás de un mensaje escrito",
  "Explicar conceptos difíciles de manera sencilla",
];

// Área 2: Aptitud Lógico-Matemática (10 preguntas)
const APTITUD_LOGICA = [
  "Resolver operaciones matemáticas con rapidez y exactitud",
  "Identificar patrones numéricos o secuencias lógicas",
  "Analizar problemas y encontrar soluciones paso a paso",
  "Interpretar gráficas, tablas o estadísticas correctamente",
  "Razonar de manera lógica ante situaciones desconocidas",
  "Aplicar fórmulas o procedimientos para resolver problemas",
  "Detectar errores lógicos en argumentos o datos",
  "Planificar y organizar tareas con criterio lógico",
  "Calcular proporciones, porcentajes o estimaciones mentalmente",
  "Comprender conceptos abstractos de matemáticas o ciencias",
];

// Área 3: Aptitud Espacial-Visual (6 preguntas)
const APTITUD_ESPACIAL = [
  "Visualizar objetos tridimensionales a partir de planos o dibujos",
  "Orientarme en espacios desconocidos sin perderme",
  "Percibir diferencias sutiles entre imágenes o diseños",
  "Dibujar o representar ideas de manera visual",
  "Calcular distancias o proporciones aproximadas con la vista",
  "Imaginar cómo quedaría un objeto si se reorganiza o modifica",
];

// Área 4: Aptitud Manual-Mecánica (6 preguntas)
const APTITUD_MANUAL = [
  "Usar herramientas manuales con precisión y seguridad",
  "Construir o armar objetos siguiendo instrucciones",
  "Reparar aparatos o equipos sencillos",
  "Realizar trabajos que requieran control fino de las manos",
  "Operar maquinaria, dispositivos o equipos tecnológicos",
  "Identificar fallas o problemas mecánicos en equipos",
];

// Área 5: Aptitud Social-Interpersonal (8 preguntas)
const APTITUD_SOCIAL = [
  "Comunicarme efectivamente con personas de distintos caracteres",
  "Escuchar con atención y comprender las emociones de otros",
  "Resolver conflictos entre personas de manera pacífica",
  "Motivar y animar a otras personas cuando enfrentan dificultades",
  "Adaptar mi comportamiento según el contexto social",
  "Trabajar en equipo y coordinar esfuerzos con otros",
  "Identificar cuándo alguien necesita apoyo o ayuda",
  "Establecer relaciones de confianza con rapidez",
];

// Área 6: Aptitud de Liderazgo y Organización (8 preguntas)
const APTITUD_LIDERAZGO = [
  "Tomar decisiones importantes bajo presión de tiempo",
  "Planificar proyectos con metas, tiempos y recursos claros",
  "Delegar tareas al miembro del equipo más adecuado",
  "Adaptarme rápidamente a cambios o situaciones imprevistas",
  "Convencer a otros de seguir una idea o proyecto",
  "Gestionar mi tiempo de forma eficiente",
  "Evaluar riesgos antes de tomar una decisión",
  "Organizar eventos, reuniones o actividades de grupo",
];

// Área 7: Aptitud Científica-Analítica (6 preguntas)
const APTITUD_CIENTIFICA = [
  "Aplicar el método científico para investigar un problema",
  "Clasificar y comparar información para extraer conclusiones",
  "Identificar relaciones de causa y efecto en situaciones complejas",
  "Usar herramientas digitales o software para analizar datos",
  "Formular hipótesis y diseñar formas de comprobarlas",
  "Presentar resultados de investigación de forma ordenada",
];

// Área 8: Aptitud Tecnológica-Digital (6 preguntas)
const APTITUD_TECNOLOGICA = [
  "Aprender a usar programas o aplicaciones nuevas rápidamente",
  "Resolver problemas técnicos en computadoras o dispositivos",
  "Buscar información confiable en internet con eficiencia",
  "Crear o editar contenido digital (videos, imágenes, documentos)",
  "Programar o entender la lógica detrás de un algoritmo",
  "Proteger mi información personal en entornos digitales",
];

// Todas las preguntas combinadas (60 en total)
const TODAS_PREGUNTAS = [
  ...APTITUD_VERBAL,
  ...APTITUD_LOGICA,
  ...APTITUD_ESPACIAL,
  ...APTITUD_MANUAL,
  ...APTITUD_SOCIAL,
  ...APTITUD_LIDERAZGO,
  ...APTITUD_CIENTIFICA,
  ...APTITUD_TECNOLOGICA,
];

const TOTAL_PREGUNTAS = TODAS_PREGUNTAS.length; // 60

// Opciones de respuesta 0–4 (hoisted, rendering-hoist-jsx)
const OPCIONES = [
  {
    valor: 0,
    texto: "Considero ser incompetente",
    color: "#EF4444",
    emoji: "😣",
  },
  {
    valor: 1,
    texto: "Considero ser poco competente",
    color: "#F97316",
    emoji: "😕",
  },
  {
    valor: 2,
    texto: "Considero ser medianamente competente",
    color: "#A3A3A3",
    emoji: "😐",
  },
  {
    valor: 3,
    texto: "Considero ser competente",
    color: "#6366F1",
    emoji: "🙂",
  },
  {
    valor: 4,
    texto: "Considero ser muy competente",
    color: "#8B5CF6",
    emoji: "😄",
  },
];

// Map de colores por valor para lookup O(1) en el mini-mapa (js-index-maps)
const COLOR_POR_VALOR = new Map(OPCIONES.map((o) => [o.valor, o.color]));

// =====================================================================
// PANTALLA DE AGRADECIMIENTO
// =====================================================================
const PantallaAgradecimiento = () => (
  <div className="aptitudes-container">
    <div className="aptitudes-gracias-wrapper">
      {/* Cabecera */}
      <div className="aptitudes-gracias-header">
        <div className="aptitudes-academia-logo">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <div className="aptitudes-academia-marca">
          <span className="aptitudes-academia-nombre">MQerK Academy</span>
          <span className="aptitudes-academia-frase">
            Vivir para pensar mejor
          </span>
        </div>
      </div>

      {/* Mensaje principal */}
      <div className="aptitudes-gracias-cuerpo">
        <div className="aptitudes-check-circle">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 className="aptitudes-gracias-titulo">¡Evaluación completada!</h1>
        <p className="aptitudes-gracias-texto">
          Gracias por tomarte el tiempo de completar tu evaluación vocacional.
          Tu esfuerzo y honestidad son el primer paso para descubrir tu mejor
          camino.
        </p>
        <p className="aptitudes-gracias-subtexto">
          Pronto recibirás tus resultados de parte de tu orientador.
        </p>
        <p className="leyenda-institucional leyenda-completado">
          Banco de preguntas provisto y avalado por COEPESEO y CGEMSySCyT.
        </p>
      </div>

      {/* RRSS */}
      <div className="aptitudes-gracias-rrss">
        <p className="aptitudes-rrss-titulo">
          Síguenos en nuestras redes sociales
        </p>
        <div className="aptitudes-rrss-botones">
          {/* Facebook — nofollow para proteger privacidad del usuario */}
          <a
            href="https://www.facebook.com/MQerKAcademy"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="aptitudes-rrss-btn aptitudes-rrss-facebook"
            aria-label="Facebook de MQerK Academy"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Facebook
          </a>

          {/* Instagram — nofollow */}
          <a
            href="https://www.instagram.com/mqerkacademy"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="aptitudes-rrss-btn aptitudes-rrss-instagram"
            aria-label="Instagram de MQerK Academy"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Instagram
          </a>

          {/* WhatsApp — nofollow */}
          <a
            href="https://wa.me/5212871515760"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="aptitudes-rrss-btn aptitudes-rrss-whatsapp"
            aria-label="WhatsApp de MQerK Academy"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
);

// =====================================================================
// COMPONENTE PRINCIPAL
// =====================================================================

const TestAptitudes = () => {
  const navigate = useNavigate();

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarGracias, setMostrarGracias] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [hoverOpcion, setHoverOpcion] = useState(null);

  // Bloqueo de transición (evita doble registro)
  const [bloqueando, setBloqueando] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  // Detección de respuesta rápida
  const ultimaRespuestaRef = useRef(null);
  const UMBRAL_MS = 1500;

  // Valores derivados en render (rerender-derived-state-no-effect)
  // Usamos preguntaActual (síncrono) en lugar de Object.keys(respuestas).length
  // que puede quedar un ciclo por detrás por el batching de React.
  const preguntasRespondidas = preguntaActual;
  const progresoTotal = (preguntasRespondidas / TOTAL_PREGUNTAS) * 100;
  const respuestaActual = respuestas[preguntaActual];

  // ---------------------------------------------------------------
  // Transición fade por pregunta
  const avanzarConTransicion = (siguiente) => {
    setAnimando(true);
    setTimeout(() => {
      siguiente();
      setTimeout(() => setAnimando(false), 50);
    }, 180);
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
        guardarResultados(respuestasActualizadas);
      }
    }, 600);
  };

  // ---------------------------------------------------------------
  // Recibe el mapa completo para evitar stale closure y side effects
  // dentro de un setState updater (anti-patrón en React)
  const guardarResultados = (todasLasRespuestas) => {
    const totalPuntaje = Object.values(todasLasRespuestas).reduce(
      (acc, val) => acc + val,
      0,
    );

    localStorage.setItem(
      "resultadosAptitudes",
      JSON.stringify({
        respuestas: todasLasRespuestas,
        totalPuntaje,
        porArea: {
          verbal: APTITUD_VERBAL.map((_, i) => ({
            pregunta: APTITUD_VERBAL[i],
            valor: todasLasRespuestas[i] ?? null,
          })),
          logica: APTITUD_LOGICA.map((_, i) => ({
            pregunta: APTITUD_LOGICA[i],
            valor: todasLasRespuestas[10 + i] ?? null,
          })),
          espacial: APTITUD_ESPACIAL.map((_, i) => ({
            pregunta: APTITUD_ESPACIAL[i],
            valor: todasLasRespuestas[20 + i] ?? null,
          })),
          manual: APTITUD_MANUAL.map((_, i) => ({
            pregunta: APTITUD_MANUAL[i],
            valor: todasLasRespuestas[26 + i] ?? null,
          })),
          social: APTITUD_SOCIAL.map((_, i) => ({
            pregunta: APTITUD_SOCIAL[i],
            valor: todasLasRespuestas[32 + i] ?? null,
          })),
          liderazgo: APTITUD_LIDERAZGO.map((_, i) => ({
            pregunta: APTITUD_LIDERAZGO[i],
            valor: todasLasRespuestas[40 + i] ?? null,
          })),
          cientifica: APTITUD_CIENTIFICA.map((_, i) => ({
            pregunta: APTITUD_CIENTIFICA[i],
            valor: todasLasRespuestas[48 + i] ?? null,
          })),
          tecnologica: APTITUD_TECNOLOGICA.map((_, i) => ({
            pregunta: APTITUD_TECNOLOGICA[i],
            valor: todasLasRespuestas[54 + i] ?? null,
          })),
        },
      }),
    );

    setMostrarGracias(true);
  };

  // ---------------------------------------------------------------
  const handleRetroceder = () => {
    if (preguntaActual > 0) {
      avanzarConTransicion(() => setPreguntaActual((p) => p - 1));
    }
  };

  // ---------------------------------------------------------------
  if (mostrarGracias) return <PantallaAgradecimiento />;

  // ---------------------------------------------------------------
  return (
    <div className="aptitudes-container">
      <AlertaPaciencia
        visible={mostrarAlerta}
        onClose={() => setMostrarAlerta(false)}
      />
      {/* Header con progreso */}
      <div className="aptitudes-header">
        <div className="aptitudes-header-top">
          <div className="aptitudes-test-info">
            <h2>Test de Aptitudes</h2>
          </div>
          <div className="aptitudes-progreso-total">
            <div className="aptitudes-progreso-texto">
              <span>
                {preguntasRespondidas} de {TOTAL_PREGUNTAS}
              </span>
              <span className="aptitudes-progreso-pct">
                {Math.round(progresoTotal)}%
              </span>
            </div>
            <div className="aptitudes-progreso-bar">
              <div
                className="aptitudes-progreso-fill"
                style={{ width: `${progresoTotal}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido con fade por pregunta */}
      <div className={`aptitudes-content ${animando ? "animando" : ""}`}>
        {/* Card: número + pregunta */}
        <div className="aptitudes-pregunta-card">
          <div className="aptitudes-card-meta">
            <span className="aptitudes-pregunta-numero">
              {preguntaActual + 1} / {TOTAL_PREGUNTAS}
            </span>
            <span className="aptitudes-seccion-label">
              ¿Qué tan competente te consideras en...?
            </span>
          </div>
          <h3 className="aptitudes-pregunta-texto">
            {TODAS_PREGUNTAS[preguntaActual]}
          </h3>
        </div>

        {/* Opciones */}
        <div className="aptitudes-opciones">
          {OPCIONES.map((opcion) => {
            const seleccionada = respuestaActual === opcion.valor;
            const enHover = hoverOpcion === opcion.valor;
            return (
              <button
                key={opcion.valor}
                className={`aptitudes-opcion-btn ${seleccionada ? "selected" : ""}`}
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
                  className="aptitudes-opcion-valor"
                  style={{ backgroundColor: opcion.color }}
                >
                  {opcion.valor}
                </span>
                <span className="aptitudes-opcion-emoji">{opcion.emoji}</span>
                <span className="aptitudes-opcion-texto">{opcion.texto}</span>
                {/* rendering-conditional-render: ternario en lugar de && */}
                {seleccionada ? (
                  <svg
                    className="aptitudes-check"
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
        <div className="aptitudes-navigation">
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
          <span className="aptitudes-nav-hint">
            Selecciona una opción para continuar
          </span>
        </div>
      </div>

      {/* Mini-mapa */}
      <div className="aptitudes-minimap">
        {TODAS_PREGUNTAS.map((_, i) => {
          const respondida = respuestas[i] !== undefined;
          const actual = i === preguntaActual;
          // O(1) lookup (js-index-maps)
          const opcionColor = respondida
            ? COLOR_POR_VALOR.get(respuestas[i])
            : undefined;

          return (
            <div
              key={i}
              className={`minimap-dot-apt ${respondida ? "respondida" : ""} ${actual ? "actual" : ""}`}
              style={
                actual
                  ? { backgroundColor: "#6366F1", transform: "scale(1.5)" }
                  : respondida
                    ? { backgroundColor: opcionColor }
                    : {}
              }
              title={`Pregunta ${i + 1}`}
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

export default TestAptitudes;
