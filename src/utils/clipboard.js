/**
 * Robust clipboard utility for VPM.
 *
 * This utility ensures that text is actually written to the clipboard
 * and handles browser permissions and fallbacks gracefully.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const copyToClipboard = async (text) => {
  if (!text) return { success: false, error: "No hay texto para copiar" };

  // 1. Intentar usar la API moderna navigator.clipboard
  if (navigator.clipboard && window.isSecureContext) {
    try {
      // Verificar permisos si el navegador lo soporta
      if (navigator.permissions && navigator.permissions.query) {
        const permissionStatus = await navigator.permissions.query({
          name: "clipboard-write",
        });
        if (permissionStatus.state === "denied") {
          return { success: false, error: "Permiso denegado por el navegador" };
        }
      }

      await navigator.clipboard.writeText(text);

      // Verificación adicional: intentar leer si el permiso lo permite (opcional y a veces invasivo)
      // Por simplicidad y UX, confiamos en el success del writeText si no hay error.

      return { success: true };
    } catch (err) {
      console.warn("navigator.clipboard falló, intentando fallback:", err);
      // Fallback al método antiguo si falla el moderno
    }
  }

  // 2. Fallback: document.execCommand('copy')
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Asegurar que no sea visible pero esté en el DOM
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      return { success: true };
    } else {
      return { success: false, error: "No se pudo copiar el texto" };
    }
  } catch (err) {
    console.error("Error crítico en copia a portapapeles:", err);
    return { success: false, error: err.message || "Error desconocido" };
  }
};
