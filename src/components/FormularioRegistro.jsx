import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioRegistro.css";

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    edad: null,
    concluidoBachillerato: null,
    bachillerato: "",
    semestre: "",
    comunidad: "",
    cursandoMqerk: null,
    cursoMqerk: "",
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState({});

  // Datos de ejemplo para los dropdowns
  const bachilleratos = [
    "CBTis",
    "CETis",
    "CONALEP",
    "Colegio de Bachilleres",
    "Preparatoria Estatal",
    "Preparatoria Federal",
    "Telebachillerato",
    "CECYTE",
    "Otro",
  ];

  const comunidades = [
    "Mérida",
    "Progreso",
    "Valladolid",
    "Tizimín",
    "Kanasín",
    "Umán",
    "Motul",
    "Tekax",
    "Otra",
  ];

  const cursosMqerk = [
    "Programación Web",
    "Diseño Gráfico",
    "Marketing Digital",
    "Inglés",
    "Robótica",
    "Desarrollo de Apps",
    "Edición de Video",
    "Fotografía",
  ];

  // Calcular edad automáticamente
  useEffect(() => {
    if (formData.fechaNacimiento) {
      const hoy = new Date();
      const fechaNac = new Date(formData.fechaNacimiento);
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
      }

      setFormData((prev) => ({ ...prev, edad }));
    }
  }, [formData.fechaNacimiento]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Limpiar campos dependientes si cambia la respuesta
      ...(name === "concluidoBachillerato" && value === "si"
        ? { bachillerato: "", semestre: "" }
        : {}),
      ...(name === "cursandoMqerk" && value === "no" ? { cursoMqerk: "" } : {}),
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = "El nombre completo es requerido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "Ingresa un teléfono válido de 10 dígitos";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    }

    if (formData.concluidoBachillerato === null) {
      newErrors.concluidoBachillerato = "Selecciona una opción";
    }

    if (formData.concluidoBachillerato === "no" && !formData.bachillerato) {
      newErrors.bachillerato = "Selecciona tu bachillerato";
    }

    if (formData.concluidoBachillerato === "no" && !formData.semestre) {
      newErrors.semestre = "Ingresa tu semestre";
    }

    if (!formData.comunidad) {
      newErrors.comunidad = "Selecciona tu comunidad";
    }

    if (formData.cursandoMqerk === null) {
      newErrors.cursandoMqerk = "Selecciona una opción";
    }

    if (formData.cursandoMqerk === "si" && !formData.cursoMqerk) {
      newErrors.cursoMqerk = "Selecciona el curso";
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Guardar los datos en sessionStorage para usarlos en otras rutas
      sessionStorage.setItem("datosEvaluado", JSON.stringify(formData));
      // Navegar a la pantalla de bienvenida
      navigate("/evaluado/bienvenida");
    }
  };

  return (
    <div className="formulario-registro">
      <div className="formulario-container">
        <div className="formulario-header">
          <div className="logo-section">
            <div className="logo-circle">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1>Test de Orientación Vocacional</h1>
          </div>
          <p className="formulario-subtitulo">
            Por favor, completa tus datos para comenzar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="formulario-form">
          {/* Nombre Completo */}
          <div className="form-group">
            <label htmlFor="nombreCompleto" className="form-label">
              Nombre Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              className={`input ${errors.nombreCompleto ? "input-error" : ""}`}
              placeholder="Ej: Juan Pérez García"
              value={formData.nombreCompleto}
              onChange={handleChange}
            />
            {errors.nombreCompleto && (
              <span className="error-message">{errors.nombreCompleto}</span>
            )}
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label htmlFor="telefono" className="form-label">
              Número de Teléfono <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className={`input ${errors.telefono ? "input-error" : ""}`}
              placeholder="Ej: 9991234567"
              value={formData.telefono}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.telefono && (
              <span className="error-message">{errors.telefono}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`input ${errors.email ? "input-error" : ""}`}
              placeholder="Ej: correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Fecha de Nacimiento y Edad */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaNacimiento" className="form-label">
                Fecha de Nacimiento <span className="required">*</span>
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                className={`input ${errors.fechaNacimiento ? "input-error" : ""}`}
                value={formData.fechaNacimiento}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.fechaNacimiento && (
                <span className="error-message">{errors.fechaNacimiento}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Edad</label>
              <input
                type="text"
                className="input"
                value={formData.edad !== null ? `${formData.edad} años` : ""}
                disabled
              />
            </div>
          </div>

          {/* ¿Ha concluido su bachillerato? */}
          <div className="form-group">
            <label className="form-label">
              ¿Ha concluido su bachillerato? <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label
                className={`radio-option ${formData.concluidoBachillerato === "si" ? "radio-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="concluidoBachillerato"
                  checked={formData.concluidoBachillerato === "si"}
                  onChange={() =>
                    handleRadioChange("concluidoBachillerato", "si")
                  }
                />
                <span className="radio-custom"></span>
                <span>Sí</span>
              </label>
              <label
                className={`radio-option ${formData.concluidoBachillerato === "no" ? "radio-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="concluidoBachillerato"
                  checked={formData.concluidoBachillerato === "no"}
                  onChange={() =>
                    handleRadioChange("concluidoBachillerato", "no")
                  }
                />
                <span className="radio-custom"></span>
                <span>No</span>
              </label>
            </div>
            {errors.concluidoBachillerato && (
              <span className="error-message">
                {errors.concluidoBachillerato}
              </span>
            )}
          </div>

          {/* Bachillerato y Semestre (solo si no ha concluido) */}
          {formData.concluidoBachillerato === "no" && (
            <>
              <div className="form-group">
                <label htmlFor="bachillerato" className="form-label">
                  Bachillerato de Procedencia{" "}
                  <span className="required">*</span>
                </label>
                <select
                  id="bachillerato"
                  name="bachillerato"
                  className={`input ${errors.bachillerato ? "input-error" : ""}`}
                  value={formData.bachillerato}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una opción</option>
                  {bachilleratos.map((bach) => (
                    <option key={bach} value={bach}>
                      {bach}
                    </option>
                  ))}
                </select>
                {errors.bachillerato && (
                  <span className="error-message">{errors.bachillerato}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="semestre" className="form-label">
                  Semestre <span className="required">*</span>
                </label>
                <select
                  id="semestre"
                  name="semestre"
                  className={`input ${errors.semestre ? "input-error" : ""}`}
                  value={formData.semestre}
                  onChange={handleChange}
                >
                  <option value="">Selecciona tu semestre</option>
                  <option value="1">1° Semestre</option>
                  <option value="2">2° Semestre</option>
                  <option value="3">3° Semestre</option>
                  <option value="4">4° Semestre</option>
                  <option value="5">5° Semestre</option>
                  <option value="6">6° Semestre</option>
                </select>
                {errors.semestre && (
                  <span className="error-message">{errors.semestre}</span>
                )}
              </div>
            </>
          )}

          {/* Comunidad */}
          <div className="form-group">
            <label htmlFor="comunidad" className="form-label">
              Comunidad <span className="required">*</span>
            </label>
            <select
              id="comunidad"
              name="comunidad"
              className={`input ${errors.comunidad ? "input-error" : ""}`}
              value={formData.comunidad}
              onChange={handleChange}
            >
              <option value="">Selecciona tu comunidad</option>
              {comunidades.map((com) => (
                <option key={com} value={com}>
                  {com}
                </option>
              ))}
            </select>
            {errors.comunidad && (
              <span className="error-message">{errors.comunidad}</span>
            )}
          </div>

          {/* ¿Está tomando un curso en Mqerk Academy? */}
          <div className="form-group">
            <label className="form-label">
              ¿Está tomando un curso en Mqerk Academy?{" "}
              <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label
                className={`radio-option ${formData.cursandoMqerk === "si" ? "radio-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="cursandoMqerk"
                  checked={formData.cursandoMqerk === "si"}
                  onChange={() => handleRadioChange("cursandoMqerk", "si")}
                />
                <span className="radio-custom"></span>
                <span>Sí</span>
              </label>
              <label
                className={`radio-option ${formData.cursandoMqerk === "no" ? "radio-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="cursandoMqerk"
                  checked={formData.cursandoMqerk === "no"}
                  onChange={() => handleRadioChange("cursandoMqerk", "no")}
                />
                <span className="radio-custom"></span>
                <span>No</span>
              </label>
            </div>
            {errors.cursandoMqerk && (
              <span className="error-message">{errors.cursandoMqerk}</span>
            )}
          </div>

          {/* Curso Mqerk (solo si está cursando) */}
          {formData.cursandoMqerk === "si" && (
            <div className="form-group">
              <label htmlFor="cursoMqerk" className="form-label">
                ¿Qué curso estás tomando? <span className="required">*</span>
              </label>
              <select
                id="cursoMqerk"
                name="cursoMqerk"
                className={`input ${errors.cursoMqerk ? "input-error" : ""}`}
                value={formData.cursoMqerk}
                onChange={handleChange}
              >
                <option value="">Selecciona el curso</option>
                {cursosMqerk.map((curso) => (
                  <option key={curso} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
              {errors.cursoMqerk && (
                <span className="error-message">{errors.cursoMqerk}</span>
              )}
            </div>
          )}

          {/* Términos y Condiciones */}
          <div className="form-group">
            <label
              className={`checkbox-option ${formData.aceptaTerminos ? "checkbox-selected" : ""} ${errors.aceptaTerminos ? "checkbox-error" : ""}`}
            >
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
              />
              <span className="checkbox-custom">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>
                Acepto los{" "}
                <a href="#" className="link-accent">
                  términos y condiciones
                </a>{" "}
                del test de orientación vocacional
              </span>
            </label>
            {errors.aceptaTerminos && (
              <span className="error-message">{errors.aceptaTerminos}</span>
            )}
          </div>

          {/* Botón de Envío */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={!formData.aceptaTerminos}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
