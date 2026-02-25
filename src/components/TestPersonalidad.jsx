import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TestPersonalidad.css";
import AlertaPaciencia from "./AlertaPaciencia";

// Datos estáticos hoisted al nivel módulo (rendering-hoist-jsx)
const PERSONALIDADES = [
  { id: 1, nombre: "Artístico", color: "#F59E0B" },
  { id: 2, nombre: "Realista", color: "#10B981" },
  { id: 3, nombre: "Social", color: "#EC4899" },
  { id: 4, nombre: "Investigativo", color: "#8B5CF6" },
  { id: 5, nombre: "Emprendedor", color: "#EF4444" },
  { id: 6, nombre: "Convencional", color: "#3B82F6" },
];

const PREGUNTAS_POR_BLOQUE = {
  1: [
    "¿Te gusta expresarte a través del arte, música o escritura?",
    "¿Disfrutas crear cosas nuevas y originales?",
    "¿Prefieres trabajar en proyectos creativos?",
    "¿Te sientes cómodo improvisando y siendo espontáneo?",
    "¿Valoras la estética y el diseño en tu entorno?",
    "¿Te gusta experimentar con diferentes formas de expresión?",
  ],
  2: [
    "¿Prefieres trabajar con herramientas y maquinaria?",
    "¿Te gusta realizar actividades físicas y prácticas?",
    "¿Disfrutas trabajar al aire libre?",
    "¿Prefieres tareas concretas con resultados tangibles?",
    "¿Te sientes cómodo con trabajos manuales?",
    "¿Te gusta construir o reparar cosas?",
  ],
  3: [
    "¿Disfrutas ayudar a otras personas?",
    "¿Te gusta trabajar en equipo y colaborar?",
    "¿Prefieres actividades que involucren interacción social?",
    "¿Te sientes cómodo enseñando o guiando a otros?",
    "¿Valoras las relaciones interpersonales?",
    "¿Te gusta participar en actividades comunitarias?",
  ],
  4: [
    "¿Disfrutas resolver problemas complejos?",
    "¿Te gusta investigar y analizar información?",
    "¿Prefieres actividades que requieran pensamiento crítico?",
    "¿Te sientes cómodo con conceptos abstractos?",
    "¿Valoras el conocimiento y el aprendizaje continuo?",
    "¿Te gusta experimentar y descubrir cosas nuevas?",
  ],
  5: [
    "¿Disfrutas liderar proyectos y equipos?",
    "¿Te gusta tomar decisiones importantes?",
    "¿Prefieres actividades que involucren persuasión?",
    "¿Te sientes cómodo asumiendo riesgos calculados?",
    "¿Valoras el éxito y los logros?",
    "¿Te gusta competir y alcanzar metas ambiciosas?",
  ],
  6: [
    "¿Prefieres trabajar con datos y números?",
    "¿Te gusta seguir procedimientos establecidos?",
    "¿Disfrutas organizar y clasificar información?",
    "¿Te sientes cómodo con tareas detalladas y precisas?",
    "¿Valoras el orden y la estructura?",
    "¿Te gusta trabajar en ambientes organizados?",
  ],
};

const OPCIONES = [
  { valor: 1, texto: "Sin coincidencia", emoji: "😐" },
  { valor: 2, texto: "Poco coincidente", emoji: "🙂" },
  { valor: 3, texto: "Más o menos coincidente", emoji: "😊" },
  { valor: 4, texto: "Coincidente", emoji: "😃" },
  { valor: 5, texto: "El más coincidente", emoji: "🤩" },
];

const TOTAL_PREGUNTAS = 36;

// Nueva escala de opacidad: 1=40%, 2=55%, 3=70%, 4=85%, 5=100%
const OPACIDAD_ESCALA = [0.4, 0.55, 0.7, 0.85, 1.0];
const calcularOpacidad = (valor) => (valor ? OPACIDAD_ESCALA[valor - 1] : 1.0);

const TestPersonalidad = () => {
  const navigate = useNavigate();

  // Estados
  const [bloqueActual, setBloqueActual] = useState(1);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [hoverOpcion, setHoverOpcion] = useState(null);

  // Bloqueo de transición (evita doble registro)
  const [bloqueando, setBloqueando] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  // Detección de respuesta rápida
  const ultimaRespuestaRef = useRef(null);
  const UMBRAL_MS = 1500; // < 1.5 s desde la última respuesta → alerta y no registrar

  // Progreso: número de preguntas ya respondidas antes de la actual
  // Se deriva de bloqueActual/preguntaActual (siempre síncronos con el render)
  // (bloqueActual-1)*6 = preguntas completadas en bloques anteriores
  // + preguntaActual = preguntas completadas dentro del bloque actual
  const preguntasRespondidas = (bloqueActual - 1) * 6 + preguntaActual;
  const progresoTotal = (preguntasRespondidas / TOTAL_PREGUNTAS) * 100;

  const handleRespuesta = (valor) => {
    if (bloqueando) return;

    // Si la respuesta anterior fue hace menos de UMBRAL_MS → alerta y NO registrar
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

    const key = `${bloqueActual}-${preguntaActual}`;
    const respuestasActualizadas = { ...respuestas, [key]: valor };
    setRespuestas(respuestasActualizadas);

    const esUltimaPregunta = preguntaActual === 5;
    const esUltimoBloque = bloqueActual === 6;

    setTimeout(() => {
      if (!esUltimaPregunta) {
        setPreguntaActual(preguntaActual + 1);
        setBloqueando(false);
      } else if (!esUltimoBloque) {
        setAnimando(true);
        setTimeout(() => setAnimando(false), 350);
        setBloqueActual(bloqueActual + 1);
        setPreguntaActual(0);
        setTimeout(() => setBloqueando(false), 200);
      } else {
        calcularResultados(respuestasActualizadas);
      }
    }, 600);
  };

  // Calcular resultados (recibe el mapa completo de respuestas para evitar stale closure)
  const calcularResultados = (todasLasRespuestas) => {
    const puntajes = PERSONALIDADES.map((p) => {
      let suma = 0;
      for (let i = 0; i < 6; i++) {
        const key = `${p.id}-${i}`;
        suma += todasLasRespuestas[key] || 0;
      }
      return { ...p, puntaje: suma };
    });

    // Ordenar por puntaje
    puntajes.sort((a, b) => b.puntaje - a.puntaje);

    // Guardar resultados en localStorage para la siguiente pantalla
    localStorage.setItem(
      "resultadosPersonalidad",
      JSON.stringify({
        mayor: puntajes[0],
        media: puntajes[2], // Tercera posición (medio)
        menor: puntajes[5],
      }),
    );

    setMostrarResultados(true);
  };

  // Navegar al siguiente test (Perfil de Intereses)
  const irAResultados = () => {
    navigate("/evaluado/test-intereses");
  };

  // Retroceder (rerender-functional-setstate)
  const handleRetroceder = () => {
    setPreguntaActual((pActual) => {
      if (pActual > 0) return pActual - 1;
      // Al inicio de bloque, retroceder al bloque anterior
      setBloqueActual((bActual) => (bActual > 1 ? bActual - 1 : bActual));
      return 5; // última pregunta del bloque anterior
    });
  };

  const personalidadActual = PERSONALIDADES[bloqueActual - 1];
  const preguntaTexto = PREGUNTAS_POR_BLOQUE[bloqueActual][preguntaActual];
  const respuestaActual = respuestas[`${bloqueActual}-${preguntaActual}`];

  if (mostrarResultados) {
    return (
      <div className="test-personalidad-container">
        <AlertaPaciencia
          visible={mostrarAlerta}
          onClose={() => setMostrarAlerta(false)}
        />
        <div className="test-completado">
          <div className="completado-icon">
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
          <p>Has respondido todas las preguntas del test de personalidad.</p>
          <p className="completado-stats">
            <strong>{TOTAL_PREGUNTAS}</strong> preguntas respondidas
          </p>
          <p className="leyenda-institucional leyenda-completado">
            Banco de preguntas provisto y avalado por COEPESEO y CGEMSySCyT.
          </p>
          <button className="btn btn-primary" onClick={irAResultados}>
            Continuar el Test
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

  return (
    <div className="test-personalidad-container">
      <AlertaPaciencia
        visible={mostrarAlerta}
        onClose={() => setMostrarAlerta(false)}
      />
      {/* Header con progreso */}
      <div className="test-header">
        <div className="test-info">
          <h2>Test de Personalidad Vocacional</h2>
          <p className="test-subtitle">Sección {bloqueActual} de 6</p>
        </div>
        <div className="test-progreso-total">
          <div className="progreso-texto">
            <span>
              {preguntasRespondidas} de {TOTAL_PREGUNTAS}
            </span>
            <span className="progreso-porcentaje">
              {Math.round(progresoTotal)}%
            </span>
          </div>
          <div className="progreso-bar">
            <div
              className="progreso-fill"
              style={{ width: `${progresoTotal}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`test-content ${animando ? "animando" : ""}`}>
        {/* Indicador de bloque */}
        <div className="bloque-indicator">
          <div
            className="bloque-badge"
            style={{ backgroundColor: personalidadActual.color }}
          >
            Sección {bloqueActual}
          </div>
          <div className="bloque-progreso">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const respuestaKey = `${bloqueActual}-${i}`;
              const valorRespuesta = respuestas[respuestaKey];
              const respondida = valorRespuesta !== undefined;
              const esPreguntaActual = i === preguntaActual;

              // Si es la pregunta actual y hay hover, usar el valor del hover
              // Si no, usar el valor de la respuesta guardada
              const valorParaMostrar =
                esPreguntaActual && hoverOpcion !== null
                  ? hoverOpcion
                  : valorRespuesta;

              // calcularOpacidad está hoisted al nivel módulo
              const opacidad = calcularOpacidad(valorParaMostrar);

              return (
                <div
                  key={i}
                  className={`bloque-dot ${i <= preguntaActual ? "active" : ""}`}
                  style={
                    i <= preguntaActual
                      ? {
                          backgroundColor: personalidadActual.color,
                          opacity: opacidad,
                          transition: esPreguntaActual
                            ? "opacity 0.15s ease"
                            : "opacity 0.3s ease",
                        }
                      : {}
                  }
                ></div>
              );
            })}
          </div>
        </div>

        {/* Pregunta */}
        <div className="pregunta-container">
          <div className="pregunta-numero">
            Pregunta {preguntaActual + 1} de 6
          </div>
          <h3 className="pregunta-texto">{preguntaTexto}</h3>
        </div>

        {/* Opciones de respuesta */}
        <div className="opciones-container">
          {OPCIONES.map((opcion) => (
            <button
              key={opcion.valor}
              className={`opcion-btn ${respuestaActual === opcion.valor ? "selected" : ""}`}
              onClick={() => handleRespuesta(opcion.valor)}
              onMouseEnter={() => setHoverOpcion(opcion.valor)}
              onMouseLeave={() => setHoverOpcion(null)}
              style={
                respuestaActual === opcion.valor
                  ? {
                      "--bloque-color": personalidadActual.color,
                      borderColor: personalidadActual.color,
                      backgroundColor: `${personalidadActual.color}15`,
                    }
                  : {
                      "--bloque-color": personalidadActual.color,
                    }
              }
            >
              <span className="opcion-emoji">{opcion.emoji}</span>
              <span className="opcion-texto">{opcion.texto}</span>
            </button>
          ))}
        </div>

        {/* Navegación */}
        <div className="test-navigation">
          <button
            className="btn btn-secondary"
            onClick={handleRetroceder}
            disabled={bloqueActual === 1 && preguntaActual === 0}
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
          <div className="navigation-info">
            Selecciona una opción para continuar
          </div>
        </div>
      </div>

      {/* Indicadores de bloques */}
      <div className="bloques-overview">
        {PERSONALIDADES.map((p) => {
          const bloqueCompletado = p.id < bloqueActual;
          const bloqueActivo = p.id === bloqueActual;

          return (
            <div
              key={p.id}
              className={`bloque-mini ${bloqueCompletado ? "completado" : ""} ${bloqueActivo ? "activo" : ""}`}
              style={bloqueActivo ? { borderColor: p.color } : {}}
            >
              <div
                className="bloque-mini-header"
                style={
                  bloqueCompletado || bloqueActivo
                    ? { backgroundColor: p.color }
                    : {}
                }
              >
                {bloqueCompletado && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {bloqueActivo && (
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {preguntaActual + 1}/6
                  </span>
                )}
              </div>
              <span className="bloque-mini-nombre">Sección {p.id}</span>
            </div>
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

export default TestPersonalidad;
