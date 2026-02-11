# Sistema de Orientación Vocacional - Flujo Completo

## 📋 Descripción del Sistema

Sistema web de orientación vocacional que permite a asesores monitorear en tiempo real el progreso de múltiples evaluados mientras estos completan un test vocacional personalizado.

## 🔄 Flujo del Sistema

### Para el Evaluado

1. **Acceso al Sistema**
   - El asesor genera un link/QR con la aplicación web
   - El evaluado accede mediante el enlace proporcionado

2. **Formulario de Registro** (`FormularioRegistro.jsx`)
   - **Datos personales:**
     - Nombre completo
     - Número de teléfono (10 dígitos)
     - Correo electrónico
     - Fecha de nacimiento (con cálculo automático de edad)
   - **Información académica:**
     - ¿Ha concluido su bachillerato? (Sí/No)
     - Si NO: Bachillerato de procedencia (dropdown)
     - Si NO: Semestre actual (dropdown)
     - Comunidad (dropdown)
   - **Información de Mqerk Academy:**
     - ¿Está tomando un curso en Mqerk Academy? (Sí/No)
     - Si SÍ: Seleccionar curso (dropdown)
   - **Aceptación:**
     - Checkbox de términos y condiciones
     - Botón "Siguiente"

3. **Pantalla de Bienvenida** (`PantallaBienvenida.jsx`)
   - Saludo personalizado: "¡Bienvenido, [Primer Nombre]!"
   - Instrucciones resumidas del test:
     - 20 preguntas sobre intereses y preferencias
     - No hay respuestas correctas o incorrectas
     - Ser honesto consigo mismo
     - Tomar tiempo para reflexionar
     - Usar botón de asistencia si necesita ayuda
     - Recibirá reporte personalizado al finalizar
   - Tiempo estimado: 15-20 minutos
   - Botón "Comenzar Test"

4. **Realización del Test** (`VistaEvaluado.jsx`)
   - Interfaz minimalista sin distracciones
   - Barra de progreso superior (#76C4C5)
   - Preguntas una por una con opciones de respuesta
   - Navegación anterior/siguiente
   - Botón flotante de ayuda
   - Indicadores de progreso

### Para el Asesor

**Dashboard de Monitorización** (`DashboardAsesor.jsx`)

- Vista en tiempo real de todos los evaluados activos
- Tarjetas de estado para cada evaluado mostrando:
  - Nombre y avatar
  - Progreso del test (%)
  - Pregunta actual / Total
  - Tiempo transcurrido
  - Estado (En progreso / Completado)
  - Indicador si necesita ayuda
- Estadísticas generales:
  - Total de evaluados activos
  - Total completados
  - Promedio de progreso
  - Cantidad que necesitan ayuda
- Botón "Brindar Asistencia" destacado para evaluados que lo soliciten

## 🎨 Diseño Visual

### Paleta de Colores

- **Color Principal:** #76C4C5 (Turquesa)
  - Botones de acción
  - Barras de progreso
  - Elementos seleccionados
  - Indicadores activos

### Características de Diseño

- ✅ Tipografía geométrica (Inter)
- ✅ Bordes suavizados (border-radius moderado)
- ✅ Espacios en blanco generosos
- ✅ Jerarquía visual clara
- ✅ Animaciones suaves
- ✅ Diseño responsive

## 📁 Estructura de Componentes

```
src/
├── components/
│   ├── FormularioRegistro.jsx       # Formulario inicial del evaluado
│   ├── FormularioRegistro.css
│   ├── PantallaBienvenida.jsx       # Pantalla de bienvenida e instrucciones
│   ├── PantallaBienvenida.css
│   ├── VistaEvaluado.jsx            # Interfaz del test
│   ├── VistaEvaluado.css
│   ├── DashboardAsesor.jsx          # Panel del asesor
│   └── DashboardAsesor.css
├── App.jsx                           # Controlador principal de flujo
├── App.css
├── index.css                         # Sistema de diseño Stitch
└── main.jsx                          # Punto de entrada
```

## 🚀 Uso del Sistema

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Navegación (Demo)

El selector flotante superior permite cambiar entre:

- **Dashboard Asesor**: Vista de monitorización
- **Flujo Evaluado**: Formulario → Bienvenida → Test

## 📊 Estados del Sistema

### Estados del Evaluado

```javascript
{
  nombreCompleto: string,
  telefono: string,
  email: string,
  fechaNacimiento: date,
  edad: number,
  concluidoBachillerato: 'si' | 'no',
  bachillerato: string,      // Solo si no ha concluido
  semestre: string,           // Solo si no ha concluido
  comunidad: string,
  cursandoMqerk: 'si' | 'no',
  cursoMqerk: string,         // Solo si está cursando
  aceptaTerminos: boolean
}
```

### Flujo de Navegación

```
Evaluado: Formulario → Bienvenida → Test
          ↓            ↓            ↓
Estado:   'formulario' 'bienvenida' 'test'
```

## 🔧 Validaciones Implementadas

### Formulario de Registro

- ✅ Nombre completo requerido
- ✅ Teléfono de 10 dígitos
- ✅ Email con formato válido
- ✅ Fecha de nacimiento requerida
- ✅ Cálculo automático de edad
- ✅ Campos condicionales según respuestas
- ✅ Términos y condiciones obligatorios

## 📱 Responsive Design

Breakpoints:

- **Desktop**: > 768px
- **Tablet**: 640px - 768px
- **Mobile**: < 640px

Adaptaciones:

- Grid de una columna en móvil
- Formularios apilados verticalmente
- Botones de ancho completo
- Espaciado optimizado

## 🎯 Características Destacadas

### Formulario de Registro

- Campos condicionales que aparecen según las respuestas
- Cálculo automático de edad al seleccionar fecha
- Validación en tiempo real
- Radio buttons y checkboxes personalizados
- Dropdowns estilizados

### Pantalla de Bienvenida

- Saludo personalizado con primer nombre
- Instrucciones claras y concisas
- Ilustración animada con círculos pulsantes
- Tiempo estimado visible
- Diseño acogedor y motivador

### Vista del Test

- Interfaz minimalista
- Barra de progreso superior destacada
- Opciones con animaciones al hover y selección
- Botón flotante de ayuda no intrusivo
- Modal de confirmación de ayuda

### Dashboard del Asesor

- Monitorización en tiempo real
- Tarjetas modulares por evaluado
- Indicadores visuales de estado
- Alertas pulsantes para ayuda
- Estadísticas agregadas

## 🔮 Próximos Pasos (Backend)

Cuando se implemente el backend, se necesitará:

1. **API Endpoints:**
   - `POST /api/evaluados` - Registrar nuevo evaluado
   - `GET /api/evaluados` - Listar evaluados activos
   - `PUT /api/evaluados/:id/progreso` - Actualizar progreso
   - `POST /api/evaluados/:id/ayuda` - Solicitar asistencia
   - `POST /api/respuestas` - Guardar respuestas del test

2. **WebSockets / SSE:**
   - Actualización en tiempo real del dashboard
   - Notificaciones de solicitudes de ayuda
   - Sincronización de progreso

3. **Base de Datos:**
   - Tabla `evaluados` (datos personales)
   - Tabla `respuestas` (respuestas del test)
   - Tabla `sesiones` (control de sesiones activas)

4. **Generación de Links/QR:**
   - Tokens únicos por evaluado
   - Expiración de enlaces
   - Tracking de accesos

---

**Versión:** 1.0.0  
**Tecnologías:** React 19 + Vite  
**Diseño:** Stitch Design Language  
**Color Principal:** #76C4C5
