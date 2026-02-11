import React, { useState } from "react";
import "./DashboardAsesor.css";

const DashboardAsesor = () => {
  // Datos de ejemplo de evaluados en tiempo real
  const [evaluados, setEvaluados] = useState([
    {
      id: 1,
      nombre: "Ana García Martínez",
      avatar: "AG",
      progreso: 75,
      preguntaActual: 15,
      totalPreguntas: 20,
      tiempoTranscurrido: "12:34",
      estado: "en_progreso",
      necesitaAyuda: false,
      ultimaActividad: "2 min",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez López",
      avatar: "CR",
      progreso: 45,
      preguntaActual: 9,
      totalPreguntas: 20,
      tiempoTranscurrido: "08:15",
      estado: "en_progreso",
      necesitaAyuda: true,
      ultimaActividad: "Ahora",
    },
    {
      id: 3,
      nombre: "María Fernández Soto",
      avatar: "MF",
      progreso: 100,
      preguntaActual: 20,
      totalPreguntas: 20,
      tiempoTranscurrido: "18:42",
      estado: "completado",
      necesitaAyuda: false,
      ultimaActividad: "5 min",
    },
    {
      id: 4,
      nombre: "José Luis Hernández",
      avatar: "JH",
      progreso: 30,
      preguntaActual: 6,
      totalPreguntas: 20,
      tiempoTranscurrido: "05:22",
      estado: "en_progreso",
      necesitaAyuda: false,
      ultimaActividad: "1 min",
    },
    {
      id: 5,
      nombre: "Laura Sánchez Ruiz",
      avatar: "LS",
      progreso: 60,
      preguntaActual: 12,
      totalPreguntas: 20,
      tiempoTranscurrido: "10:08",
      estado: "en_progreso",
      necesitaAyuda: false,
      ultimaActividad: "30 seg",
    },
    {
      id: 6,
      nombre: "Roberto Díaz Castro",
      avatar: "RD",
      progreso: 15,
      preguntaActual: 3,
      totalPreguntas: 20,
      tiempoTranscurrido: "03:45",
      estado: "en_progreso",
      necesitaAyuda: true,
      ultimaActividad: "Ahora",
    },
  ]);

  const handleBrindarAsistencia = (evaluadoId) => {
    console.log(`Brindando asistencia al evaluado ${evaluadoId}`);
    // Aquí iría la lógica para abrir un chat o modal de asistencia
  };

  const handleVerDetalle = (evaluadoId) => {
    console.log(`Viendo detalle del evaluado ${evaluadoId}`);
  };

  // Estadísticas generales
  const estadisticas = {
    totalActivos: evaluados.filter((e) => e.estado === "en_progreso").length,
    totalCompletados: evaluados.filter((e) => e.estado === "completado").length,
    promedioProgreso: Math.round(
      evaluados.reduce((acc, e) => acc + e.progreso, 0) / evaluados.length,
    ),
    necesitanAyuda: evaluados.filter((e) => e.necesitaAyuda).length,
  };

  return (
    <div className="dashboard-asesor">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Panel de Monitorización</h1>
              <p className="text-neutral-600">
                Sistema de Orientación Vocacional
              </p>
            </div>
            <div className="header-actions">
              <button className="btn btn-ghost">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="notification-badge">2</span>
              </button>
              <div className="user-profile">
                <div className="avatar">AS</div>
                <span className="font-medium">Asesor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Estadísticas Rápidas */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-primary">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Evaluados Activos</p>
                <p className="stat-value">{estadisticas.totalActivos}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-success">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Completados</p>
                <p className="stat-value">{estadisticas.totalCompletados}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-warning">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Necesitan Ayuda</p>
                <p className="stat-value">{estadisticas.necesitanAyuda}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-info">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Progreso Promedio</p>
                <p className="stat-value">{estadisticas.promedioProgreso}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Evaluados */}
      <section className="evaluados-section">
        <div className="container">
          <div className="section-header">
            <h2>Evaluados en Tiempo Real</h2>
            <div className="section-actions">
              <button className="btn btn-secondary btn-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>

          <div className="evaluados-grid">
            {evaluados.map((evaluado) => (
              <div
                key={evaluado.id}
                className={`evaluado-card ${evaluado.necesitaAyuda ? "evaluado-card-alert" : ""} ${evaluado.estado === "completado" ? "evaluado-card-completed" : ""}`}
              >
                {/* Header de la tarjeta */}
                <div className="evaluado-card-header">
                  <div className="evaluado-info">
                    <div className="avatar-large">{evaluado.avatar}</div>
                    <div>
                      <h3 className="evaluado-nombre">{evaluado.nombre}</h3>
                      <p className="evaluado-actividad">
                        <span className="activity-dot"></span>
                        Última actividad: {evaluado.ultimaActividad}
                      </p>
                    </div>
                  </div>
                  {evaluado.necesitaAyuda && (
                    <div className="help-indicator">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Progreso */}
                <div className="evaluado-progress-section">
                  <div className="progress-header">
                    <span className="text-sm text-neutral-600">
                      Progreso del Test
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      {evaluado.progreso}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${evaluado.progreso}%` }}
                    ></div>
                  </div>
                  <div className="progress-details">
                    <span className="text-xs text-neutral-500">
                      Pregunta {evaluado.preguntaActual} de{" "}
                      {evaluado.totalPreguntas}
                    </span>
                    <span className="text-xs text-neutral-500">
                      ⏱ {evaluado.tiempoTranscurrido}
                    </span>
                  </div>
                </div>

                {/* Estado */}
                <div className="evaluado-status">
                  {evaluado.estado === "completado" ? (
                    <span className="badge badge-success">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Completado
                    </span>
                  ) : (
                    <span className="badge badge-info">
                      <span className="animate-pulse">●</span>
                      En Progreso
                    </span>
                  )}
                </div>

                {/* Acciones */}
                <div className="evaluado-actions">
                  {evaluado.necesitaAyuda ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleBrindarAsistencia(evaluado.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Brindar Asistencia
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleVerDetalle(evaluado.id)}
                    >
                      Ver Detalle
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardAsesor;
