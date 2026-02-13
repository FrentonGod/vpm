import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestPersonalidad.css";

const TestPersonalidad = () => {
  const navigate = useNavigate();

  // Definición de personalidades y sus bloques
  const personalidades = [
    { id: 1, nombre: "Artístico", color: "#F59E0B" },
    { id: 2, nombre: "Realista", color: "#10B981" },
    { id: 3, nombre: "Social", color: "#EC4899" },
    { id: 4, nombre: "Investigativo", color: "#8B5CF6" },
    { id: 5, nombre: "Emprendedor", color: "#EF4444" },
    { id: 6, nombre: "Convencional", color: "#3B82F6" },
  ];

  // Preguntas de ejemplo para cada bloque (6 preguntas por bloque)
  const preguntasPorBloque = {
    1: [
      // Artístico
      "¿Te gusta expresarte a través del arte, música o escritura?",
      "¿Disfrutas crear cosas nuevas y originales?",
      "¿Prefieres trabajar en proyectos creativos?",
      "¿Te sientes cómodo improvisando y siendo espontáneo?",
      "¿Valoras la estética y el diseño en tu entorno?",
      "¿Te gusta experimentar con diferentes formas de expresión?",
    ],
    2: [
      // Realista
      "¿Prefieres trabajar con herramientas y maquinaria?",
      "¿Te gusta realizar actividades físicas y prácticas?",
      "¿Disfrutas trabajar al aire libre?",
      "¿Prefieres tareas concretas con resultados tangibles?",
      "¿Te sientes cómodo con trabajos manuales?",
      "¿Te gusta construir o reparar cosas?",
    ],
    3: [
      // Social
      "¿Disfrutas ayudar a otras personas?",
      "¿Te gusta trabajar en equipo y colaborar?",
      "¿Prefieres actividades que involucren interacción social?",
      "¿Te sientes cómodo enseñando o guiando a otros?",
      "¿Valoras las relaciones interpersonales?",
      "¿Te gusta participar en actividades comunitarias?",
    ],
    4: [
      // Investigativo
      "¿Disfrutas resolver problemas complejos?",
      "¿Te gusta investigar y analizar información?",
      "¿Prefieres actividades que requieran pensamiento crítico?",
      "¿Te sientes cómodo con conceptos abstractos?",
      "¿Valoras el conocimiento y el aprendizaje continuo?",
      "¿Te gusta experimentar y descubrir cosas nuevas?",
    ],
    5: [
      // Emprendedor
      "¿Disfrutas liderar proyectos y equipos?",
      "¿Te gusta tomar decisiones importantes?",
      "¿Prefieres actividades que involucren persuasión?",
      "¿Te sientes cómodo asumiendo riesgos calculados?",
      "¿Valoras el éxito y los logros?",
      "¿Te gusta competir y alcanzar metas ambiciosas?",
    ],
    6: [
      // Convencional
      "¿Prefieres trabajar con datos y números?",
      "¿Te gusta seguir procedimientos establecidos?",
      "¿Disfrutas organizar y clasificar información?",
      "¿Te sientes cómodo con tareas detalladas y precisas?",
      "¿Valoras el orden y la estructura?",
      "¿Te gusta trabajar en ambientes organizados?",
    ],
  };

  // Opciones de respuesta
  const opciones = [
    { valor: 1, texto: "Sin coincidencia", emoji: "😐" },
    { valor: 2, texto: "Poco coincidente", emoji: "🙂" },
    { valor: 3, texto: "Más o menos coincidente", emoji: "😊" },
    { valor: 4, texto: "Coincidente", emoji: "😃" },
    { valor: 5, texto: "El más coincidente", emoji: "🤩" },
  ];

  // Estados
  const [bloqueActual, setBloqueActual] = useState(1);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [animando, setAnimando] = useState(false);
  const [hoverOpcion, setHoverOpcion] = useState(null);

  // Calcular progreso total
  const totalPreguntas = 36;
  const preguntasRespondidas = Object.keys(respuestas).length;
  const progresoTotal = (preguntasRespondidas / totalPreguntas) * 100;

  // Manejar selección de respuesta
  const handleRespuesta = (valor) => {
    const key = `${bloqueActual}-${preguntaActual}`;
    setRespuestas({ ...respuestas, [key]: valor });

    // Avanzar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual < 5) {
        // Siguiente pregunta del mismo bloque
        setPreguntaActual(preguntaActual + 1);
      } else if (bloqueActual < 6) {
        // Cambio de bloque - activar animación
        setAnimando(true);
        setTimeout(() => {
          setBloqueActual(bloqueActual + 1);
          setPreguntaActual(0);
          setTimeout(() => setAnimando(false), 50);
        }, 300);
      } else {
        // Test completado
        calcularResultados();
      }
    }, 300);
  };

  // Calcular resultados
  const calcularResultados = () => {
    const puntajes = personalidades.map((p) => {
      let suma = 0;
      for (let i = 0; i < 6; i++) {
        const key = `${p.id}-${i}`;
        suma += respuestas[key] || 0;
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

  // Navegar a resultados
  const irAResultados = () => {
    // Aquí navegarías a la pantalla de resultados
    console.log("Navegando a resultados...");
    // navigate('/evaluado/resultados-personalidad');
  };

  // Retroceder
  const handleRetroceder = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    } else if (bloqueActual > 1) {
      setBloqueActual(bloqueActual - 1);
      setPreguntaActual(5);
    }
  };

  const personalidadActual = personalidades[bloqueActual - 1];
  const preguntaTexto = preguntasPorBloque[bloqueActual][preguntaActual];
  const respuestaActual = respuestas[`${bloqueActual}-${preguntaActual}`];

  if (mostrarResultados) {
    return (
      <div className="test-personalidad-container">
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
            <strong>{totalPreguntas}</strong> preguntas respondidas
          </p>
          <button className="btn btn-primary" onClick={irAResultados}>
            Ver Resultados
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
      {/* Header con progreso */}
      <div className="test-header">
        <div className="test-info">
          <h2>Test de Personalidad Vocacional</h2>
          <p className="test-subtitle">Sección {bloqueActual} de 6</p>
        </div>
        <div className="test-progreso-total">
          <div className="progreso-texto">
            <span>
              {preguntasRespondidas} de {totalPreguntas}
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

              // Calcular opacidad según el valor de la respuesta (1-5)
              // Nueva escala más visible: 1=40%, 2=55%, 3=70%, 4=85%, 5=100%
              const calcularOpacidad = (valor) => {
                if (!valor) return 1.0; // Por defecto, 100% (color más intenso)
                const escala = [0.4, 0.55, 0.7, 0.85, 1.0];
                return escala[valor - 1];
              };

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
          {opciones.map((opcion) => (
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
        {personalidades.map((p) => {
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
    </div>
  );
};

export default TestPersonalidad;
