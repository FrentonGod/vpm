# VPM — Sistema de Orientación Vocacional

> **Vocational Personality Measurement** · Desarrollado para MQerK Academy

---

## 📋 Descripción

VPM es una aplicación web de orientación vocacional con dos tipos de usuario:

| Usuario      | Acceso                                            |
| ------------ | ------------------------------------------------- |
| **Asesor**   | Login → Dashboard → Genera links para evaluados   |
| **Evaluado** | Accede por link → Registro → 3 Tests secuenciales |

---

## 🔄 Rutas del Sistema

### Rutas del Asesor

| Ruta      | Componente        | Acceso                       |
| --------- | ----------------- | ---------------------------- |
| `/login`  | `LoginAsesor`     | Pública                      |
| `/asesor` | `DashboardAsesor` | Protegida (`ProtectedRoute`) |

### Rutas del Evaluado

| Ruta                          | Componente           | Descripción                                |
| ----------------------------- | -------------------- | ------------------------------------------ |
| `/evaluado`                   | Redirect             | Redirige a `/evaluado/registro`            |
| `/evaluado/registro`          | `FormularioRegistro` | Datos personales del evaluado              |
| `/evaluado/test-personalidad` | `TestPersonalidad`   | Test de Personalidad — 36 preguntas        |
| `/evaluado/test-intereses`    | `TestIntereses`      | Test de Perfil de Intereses — 60 preguntas |
| `/evaluado/test-aptitudes`    | `TestAptitudes`      | Test de Aptitudes — 60 preguntas           |

---

## 🚀 Flujo del Evaluado

```
1. /evaluado/registro
   ↓ Formulario de datos personales

2. /evaluado/test-personalidad
   ↓ 36 preguntas · 6 secciones × 6 preguntas
   ↓ Escala 1–5 · Resultados guardados en localStorage

3. /evaluado/test-intereses
   ↓ 60 preguntas (Parte 1: actividades · Parte 2: profesiones)
   ↓ Escala 1–4 · Resultados guardados en localStorage

4. /evaluado/test-aptitudes
   ↓ 60 preguntas · 8 áreas de aptitud
   ↓ Escala 0–4 · Resultados guardados en localStorage
   ✓ Pantalla de agradecimiento con redes de MQerK Academy
```

---

## 📁 Estructura de Archivos

```
src/
├── App.jsx                         # Router principal
├── App.css
├── main.jsx                        # Punto de entrada
├── index.css                       # Design system (variables CSS)
└── components/
    ├── LoginAsesor.jsx             # Login del asesor con autocompletado de email
    ├── LoginAsesor.css
    ├── DashboardAsesor.jsx         # Panel del asesor
    ├── DashboardAsesor.css
    ├── ModalGenerarLink.jsx        # Modal para generar links de evaluación
    ├── ModalGenerarLink.css
    ├── FormularioRegistro.jsx      # Registro de datos del evaluado
    ├── FormularioRegistro.css
    ├── TestPersonalidad.jsx        # Test de Personalidad (36 preg.)
    ├── TestPersonalidad.css
    ├── TestIntereses.jsx           # Test de Perfil de Intereses (60 preg.)
    ├── TestIntereses.css
    ├── TestAptitudes.jsx           # Test de Aptitudes (60 preg.)
    ├── TestAptitudes.css
    └── NotFound.jsx                # Página 404
```

---

## 🎨 Sistema de Diseño

- **Tipografía**: Inter (Google Fonts)
- **Estilos**: Vanilla CSS con variables (sin Tailwind, sin UI libs)
- **Breakpoints**: `>768px` Desktop · `≤768px` Tablet · `≤480px` Móvil

### Colores por test

| Test                        | Color               |
| --------------------------- | ------------------- |
| Test de Personalidad        | `#76c4c5` (teal)    |
| Test de Intereses           | verde esmeralda     |
| Test de Aptitudes           | `#6366f1` (índigo)  |
| Pantalla final de Aptitudes | `#8756e5` (púrpura) |

---

## 🧠 Tests — Resumen

### Test de Personalidad

- **36 preguntas** en 6 secciones (Artístico, Realista, Social, Investigativo, Emprendedor, Convencional)
- **Escala 1–5**: Sin coincidencia → El más coincidente
- Guarda `resultadosPersonalidad` en `localStorage`

### Test de Perfil de Intereses

- **60 sentencias** divididas en 2 partes
- Parte 1 (50): "¿Qué tanto te gustaría...?"
- Parte 2 (10): "¿Qué tanto te gustaría trabajar como...?"
- **Escala 1–4**: Me desagrada → Me gusta mucho
- Guarda `resultadosIntereses` en `localStorage`

### Test de Aptitudes

- **60 preguntas** en 8 áreas: Verbal, Lógico-Matemática, Espacial, Manual, Social, Liderazgo, Científica, Tecnológica
- **Escala 0–4**: Incompetente → Muy competente
- Guarda `resultadosAptitudes` en `localStorage`
- Pantalla de agradecimiento con links a redes de MQerK Academy

---

## 💾 Gestión de Datos

```
sessionStorage  →  "datosEvaluado"         (FormularioRegistro)
localStorage    →  "resultadosPersonalidad" (TestPersonalidad)
localStorage    →  "resultadosIntereses"    (TestIntereses)
localStorage    →  "resultadosAptitudes"    (TestAptitudes)
localStorage    →  "asesorAuth"             (LoginAsesor)
```

---

## 🛠️ Tecnologías

- **React 19** + **Vite** — Framework y build tool
- **React Router DOM 7** — Enrutamiento
- **Vanilla CSS** — Estilos (sin Tailwind ni librerías UI)
- **localStorage / sessionStorage** — Persistencia temporal

---

## 🚀 Desarrollo

```bash
npm install
npm run dev
# http://localhost:5173
```

---

## 🔐 Autenticación

- El asesor inicia sesión con email/contraseña
- La sesión se guarda en `localStorage` como `asesorAuth`
- Las rutas del asesor están protegidas con `<ProtectedRoute>`
- **Pendiente**: Integrar con Supabase Auth

---

## 🔮 Próximos Pasos

- [ ] **Pantalla de Resultados** — Mostrar las 3 personalidades al evaluado tras completar los tests
- [ ] **Integración Supabase Auth** — Autenticación real del asesor
- [ ] **Integración Supabase DB** — Guardar evaluados y resultados en base de datos
- [ ] **Historial de Evaluados** — Vista en dashboard con resultados por evaluado

---

**Versión:** 3.0.0
**Academia:** MQerK Academy — _Vivir para pensar mejor_
