# Sistema de Orientación Vocacional - Diseño Stitch

## 🎨 Descripción del Diseño

Este proyecto implementa una interfaz de usuario moderna y profesional para un sistema de orientación vocacional web, basado en el lenguaje de diseño **Stitch**. El diseño prioriza la claridad visual, la usabilidad y una experiencia premium tanto para asesores como para evaluados.

## 🌈 Paleta de Colores

### Color Principal de Acento
- **#76C4C5** - Color turquesa utilizado para:
  - Botones de acción primarios
  - Indicadores de progreso
  - Iconos activos
  - Estados de selección
  - Elementos interactivos destacados

### Colores Complementarios
- **Neutrales**: Escala de grises del 50 al 900 para texto, fondos y bordes
- **Semánticos**: 
  - Success: `#10b981` (verde)
  - Warning: `#f59e0b` (ámbar)
  - Error: `#ef4444` (rojo)

## 📐 Principios de Diseño

### 1. Tipografía Geométrica
- **Fuente principal**: Inter (Google Fonts)
- Pesos: 300, 400, 500, 600, 700, 800
- Jerarquía clara con tamaños escalados
- Letter-spacing optimizado para legibilidad

### 2. Espaciado Generoso
- Sistema de espaciado en escala de 8px
- Espacios en blanco amplios para reducir fatiga cognitiva
- Padding y margins consistentes

### 3. Bordes Suavizados
- Border-radius moderado (0.375rem - 1.5rem)
- Esquinas redondeadas para un aspecto amigable
- Bordes más pronunciados en elementos destacados

### 4. Jerarquía Visual Clara
- Uso de tamaño, peso y color para establecer importancia
- Contraste adecuado entre contenido y acciones
- Separación visual entre secciones

## 🖥️ Vistas Implementadas

### 1. Dashboard del Asesor
**Propósito**: Panel de monitorización en tiempo real para supervisar múltiples evaluados simultáneamente.

**Características**:
- ✅ Tarjetas modulares de estado para cada evaluado
- ✅ Estadísticas generales (activos, completados, promedio de progreso)
- ✅ Indicadores de progreso con color #76C4C5
- ✅ Botones destacados de "Brindar Asistencia" para evaluados que necesitan ayuda
- ✅ Indicadores visuales pulsantes para alertas
- ✅ Diseño en grid responsive
- ✅ Alta legibilidad con tipografía Inter

**Componentes clave**:
- Tarjetas de evaluado con avatar, progreso y estado
- Estadísticas en tiempo real
- Sistema de notificaciones
- Acciones rápidas por evaluado

### 2. Vista del Evaluado
**Propósito**: Entorno minimalista y sin distracciones para realizar el test vocacional.

**Características**:
- ✅ Barra de progreso superior con color #76C4C5
- ✅ Interfaz limpia centrada en la pregunta actual
- ✅ Opciones de respuesta con animaciones suaves
- ✅ Indicador circular de progreso
- ✅ Navegación intuitiva (anterior/siguiente)
- ✅ Botón flotante de "Ayuda" fácilmente identificable pero no intrusivo
- ✅ Modal de confirmación para solicitudes de ayuda
- ✅ Espaciado generoso para evitar fatiga visual

**Componentes clave**:
- Barra de progreso superior fija
- Tarjeta de pregunta con número destacado
- Opciones de respuesta con estados hover y selección
- Indicadores de navegación tipo "dots"
- Botón flotante de ayuda con efecto hover

## 🎯 Elementos de Diseño Destacados

### Botones
```css
.btn-primary {
  background-color: #76C4C5;
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background-color: #5fb0b1;
  box-shadow: 0 10px 25px rgba(118, 196, 197, 0.3);
  transform: translateY(-1px);
}
```

### Barras de Progreso
```css
.progress-bar-fill {
  background: linear-gradient(90deg, #76C4C5 0%, #5fb0b1 100%);
  transition: width 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tarjetas
```css
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e5e5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## 🚀 Uso del Proyecto

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Navegación entre Vistas
El proyecto incluye un selector flotante en la parte superior que permite cambiar entre:
- **Dashboard Asesor**: Vista de monitorización
- **Vista Evaluado**: Interfaz de test

## 📱 Responsive Design

El diseño es completamente responsive con breakpoints en:
- **Desktop**: > 768px
- **Tablet**: 640px - 768px
- **Mobile**: < 640px

Adaptaciones móviles:
- Grid de tarjetas a columna única
- Selector de vistas apilado verticalmente
- Botones de navegación adaptados
- Espaciado reducido para pantallas pequeñas

## 🎨 Sistema de Tokens de Diseño

Todos los valores de diseño están centralizados en variables CSS en `index.css`:

```css
:root {
  /* Colores */
  --accent-primary: #76C4C5;
  
  /* Espaciado */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* Transiciones */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🔧 Personalización

Para cambiar el color de acento principal, simplemente modifica la variable en `src/index.css`:

```css
:root {
  --accent-primary: #TU_COLOR_AQUI;
  --accent-primary-hover: #VERSION_MAS_OSCURA;
}
```

## 📦 Estructura de Archivos

```
src/
├── components/
│   ├── DashboardAsesor.jsx      # Dashboard del asesor
│   ├── DashboardAsesor.css      # Estilos del dashboard
│   ├── VistaEvaluado.jsx        # Vista del test
│   └── VistaEvaluado.css        # Estilos de la vista
├── App.jsx                       # Componente principal
├── App.css                       # Estilos del app
└── index.css                     # Sistema de diseño base
```

## ✨ Características Premium

- **Micro-animaciones**: Transiciones suaves en hover, selección y cambios de estado
- **Glassmorphism sutil**: Efectos de profundidad en tarjetas
- **Gradientes dinámicos**: Uso de gradientes lineales para elementos destacados
- **Iconografía SVG**: Iconos vectoriales escalables
- **Estados interactivos**: Feedback visual inmediato en todas las interacciones
- **Accesibilidad**: Contraste adecuado y tamaños de fuente legibles

## 🎯 Mejores Prácticas Implementadas

1. **Diseño centrado en el usuario**: Interfaz intuitiva y sin distracciones
2. **Consistencia visual**: Uso coherente de colores, espaciado y tipografía
3. **Feedback inmediato**: Animaciones y estados que confirman acciones
4. **Jerarquía clara**: Información organizada por importancia
5. **Performance**: Animaciones optimizadas con CSS transforms
6. **Mantenibilidad**: Sistema de tokens centralizado

---

**Desarrollado con React + Vite**  
**Diseño basado en Stitch Design Language**  
**Color de acento: #76C4C5**
