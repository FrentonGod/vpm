# Sistema de Orientación Vocacional - Con Rutas

## 📋 Descripción del Sistema

Sistema web de orientación vocacional que permite a asesores monitorear en tiempo real el progreso de múltiples evaluados mientras estos completan un test vocacional personalizado.

## 🔄 Rutas del Sistema

### Rutas del Asesor

| Ruta      | Componente        | Descripción                        |
| --------- | ----------------- | ---------------------------------- |
| `/`       | Redirect          | Redirige a `/asesor`               |
| `/asesor` | `DashboardAsesor` | Panel de monitorización del asesor |

### Rutas del Evaluado

| Ruta                   | Componente           | Descripción                     |
| ---------------------- | -------------------- | ------------------------------- |
| `/evaluado`            | Redirect             | Redirige a `/evaluado/registro` |
| `/evaluado/registro`   | `FormularioRegistro` | Formulario de datos personales  |
| `/evaluado/bienvenida` | `PantallaBienvenida` | Instrucciones del test          |
| `/evaluado/test`       | `VistaEvaluado`      | Realización del test            |
| `/evaluado/finalizado` | `PantallaFinalizada` | Pantalla de agradecimiento      |

## 🚀 Flujo del Evaluado

```
1. /evaluado/registro
   ↓ (completa formulario)
   ↓ (datos guardados en sessionStorage)

2. /evaluado/bienvenida
   ↓ (lee instrucciones)
   ↓ (click en "Comenzar Test")

3. /evaluado/test
   ↓ (responde 20 preguntas)
   ↓ (click en "Finalizar Test")

4. /evaluado/finalizado
   ✓ (pantalla de agradecimiento)
```

## 💾 Gestión de Datos

### SessionStorage

Los datos del evaluado se guardan en `sessionStorage` para persistir entre rutas:

```javascript
// Guardar datos (en FormularioRegistro)
sessionStorage.setItem("datosEvaluado", JSON.stringify(formData));

// Leer datos (en otras rutas)
const datosGuardados = sessionStorage.getItem("datosEvaluado");
const datos = JSON.parse(datosGuardados);
```

### Protección de Rutas

Todas las rutas del evaluado (excepto `/evaluado/registro`) verifican que existan datos en sessionStorage:

```javascript
useEffect(() => {
  const datosGuardados = sessionStorage.getItem("datosEvaluado");
  if (!datosGuardados) {
    navigate("/evaluado/registro"); // Redirige si no hay datos
  }
}, [navigate]);
```

## 📁 Estructura de Archivos

```
src/
├── App.jsx                           # Router principal con todas las rutas
├── App.css                           # Estilos mínimos de la app
├── main.jsx                          # Punto de entrada
├── index.css                         # Sistema de diseño Stitch
└── components/
    ├── DashboardAsesor.jsx           # Dashboard del asesor
    ├── DashboardAsesor.css
    ├── FormularioRegistro.jsx        # Formulario inicial
    ├── FormularioRegistro.css
    ├── PantallaBienvenida.jsx        # Pantalla de bienvenida
    ├── PantallaBienvenida.css
    ├── VistaEvaluado.jsx             # Interfaz del test
    ├── VistaEvaluado.css
    ├── PantallaFinalizada.jsx        # Pantalla de agradecimiento
    └── PantallaFinalizada.css
```

## 🛠️ Tecnologías

- **React 19** - Framework principal
- **React Router DOM 7** - Manejo de rutas
- **Vite** - Build tool y dev server
- **CSS Modules** - Estilos por componente

## 🎨 Diseño

- **Sistema de diseño**: Stitch Design Language
- **Color principal**: #76C4C5 (Turquesa)
- **Tipografía**: Inter (Google Fonts)
- **Responsive**: Desktop, Tablet, Móvil

## 🚀 Uso del Sistema

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

### Navegación

#### Para Asesores:

- Ir a: `http://localhost:5173/asesor`
- Ver dashboard con evaluados activos

#### Para Evaluados:

- Ir a: `http://localhost:5173/evaluado`
- Completar el flujo completo:
  1. Registro
  2. Bienvenida
  3. Test
  4. Finalización

## 📊 Datos del Formulario

```javascript
{
  nombreCompleto: string,
  telefono: string,           // 10 dígitos
  email: string,
  fechaNacimiento: date,
  edad: number,               // Calculado automáticamente
  concluidoBachillerato: 'si' | 'no',
  bachillerato: string,       // Solo si no ha concluido
  semestre: string,           // Solo si no ha concluido
  comunidad: string,
  cursandoMqerk: 'si' | 'no',
  cursoMqerk: string,         // Solo si está cursando
  aceptaTerminos: boolean
}
```

## 🔐 Validaciones

### Formulario de Registro

- ✅ Nombre completo requerido
- ✅ Teléfono de 10 dígitos
- ✅ Email con formato válido
- ✅ Fecha de nacimiento requerida
- ✅ Campos condicionales según respuestas
- ✅ Términos y condiciones obligatorios
- ✅ Botón deshabilitado sin aceptar términos

### Navegación

- ✅ Protección de rutas con sessionStorage
- ✅ Redirección automática si faltan datos
- ✅ Validación de respuestas antes de avanzar

## 📱 Responsive Design

### Breakpoints:

- **Desktop**: > 768px
- **Tablet**: 640px - 768px
- **Mobile**: < 640px

### Optimizaciones:

- ✅ Todas las opciones visibles sin scroll
- ✅ Tamaños de fuente adaptativos
- ✅ Padding y spacing optimizados
- ✅ Botones táctiles adecuados

## 🎯 Características Destacadas

### FormularioRegistro

- Campos condicionales dinámicos
- Cálculo automático de edad
- Validación en tiempo real
- Navegación a `/evaluado/bienvenida`

### PantallaBienvenida

- Saludo personalizado con primer nombre
- Instrucciones claras del test
- Ilustración animada
- Navegación a `/evaluado/test`

### VistaEvaluado

- Interfaz minimalista
- Barra de progreso superior
- 20 preguntas con 5 opciones
- Botón flotante de ayuda
- Navegación a `/evaluado/finalizado`

### PantallaFinalizada

- Animación de éxito
- Mensaje personalizado
- Información de próximos pasos
- 3 pasos del proceso

## 🔮 Próximos Pasos (Backend)

1. **API Endpoints:**

   ```
   POST /api/evaluados          - Registrar evaluado
   GET  /api/evaluados          - Listar evaluados
   PUT  /api/evaluados/:id      - Actualizar progreso
   POST /api/respuestas         - Guardar respuestas
   POST /api/ayuda              - Solicitar asistencia
   ```

2. **WebSockets / SSE:**
   - Actualización en tiempo real del dashboard
   - Notificaciones de solicitudes de ayuda

3. **Base de Datos:**
   - Tabla `evaluados`
   - Tabla `respuestas`
   - Tabla `sesiones`

4. **Autenticación:**
   - Tokens únicos por evaluado
   - Links con expiración
   - Tracking de accesos

## 📝 Notas Importantes

- **SessionStorage**: Los datos se pierden al cerrar la pestaña
- **Validación de rutas**: Todas las rutas protegidas redirigen a `/evaluado/registro`
- **Navegación**: Usar `navigate()` de React Router, no `window.location`
- **Datos de ejemplo**: El test tiene 3 preguntas de ejemplo, expandir a 20

---

**Versión:** 2.0.0 (Con Rutas)  
**Tecnologías:** React 19 + React Router 7 + Vite  
**Diseño:** Stitch Design Language  
**Color Principal:** #76C4C5
