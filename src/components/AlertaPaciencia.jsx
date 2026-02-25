import "./AlertaPaciencia.css";

/**
 * Overlay bloqueante de pantalla completa.
 * Se muestra cuando el evaluado responde demasiado rápido.
 * No puede ser suprimido por el navegador (es estado de React, no window.alert).
 *
 * Props:
 *   visible  {boolean}  — controla si se muestra
 *   onClose  {function} — callback al hacer clic en "Entendido"
 */
const AlertaPaciencia = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="alerta-overlay" role="alertdialog" aria-modal="true">
      <div className="alerta-card">
        <span className="alerta-icono">🙏</span>
        <h2 className="alerta-titulo">¡Un momento!</h2>
        <p className="alerta-mensaje">
          Por favor, tómate el tiempo necesario para leer y responder cada
          pregunta con calma. Tus respuestas importan.
        </p>
        <button className="alerta-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default AlertaPaciencia;
