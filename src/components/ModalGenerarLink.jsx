import React, { useState, useEffect } from "react";
import "./ModalGenerarLink.css";

const ModalGenerarLink = ({ isOpen, onClose }) => {
  const [linkGenerado, setLinkGenerado] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [nombreEvaluado, setNombreEvaluado] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generar link único
      const uniqueId = generateUniqueId();
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/evaluado/registro?id=${uniqueId}`;
      setLinkGenerado(link);

      // Generar QR code usando API pública
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`;
      setQrCode(qrUrl);

      // Reset estados
      setCopiado(false);
      setShowQR(false);
      setNombreEvaluado("");
    }
  }, [isOpen]);

  const generateUniqueId = () => {
    return "eval_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(linkGenerado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleDescargarQR = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-evaluacion-${nombreEvaluado || "evaluado"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCompartirWhatsApp = () => {
    const mensaje = nombreEvaluado
      ? `Hola ${nombreEvaluado}, te comparto el link para realizar tu evaluación vocacional: ${linkGenerado}`
      : `Te comparto el link para realizar tu evaluación vocacional: ${linkGenerado}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCompartirEmail = () => {
    const asunto = "Evaluación Vocacional - VPM";
    const cuerpo = nombreEvaluado
      ? `Hola ${nombreEvaluado},\n\nTe invito a realizar tu evaluación vocacional a través del siguiente enlace:\n\n${linkGenerado}\n\nSaludos,\nEquipo VPM`
      : `Te invito a realizar tu evaluación vocacional a través del siguiente enlace:\n\n${linkGenerado}\n\nSaludos,\nEquipo VPM`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = mailtoUrl;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <div>
            <h2>Generar Link de Evaluación</h2>
            <p>Comparte este enlace con el evaluado para que realice el test</p>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Cerrar">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Campo opcional de nombre */}
          <div className="form-group">
            <label htmlFor="nombreEvaluado">
              Nombre del Evaluado (Opcional)
            </label>
            <input
              type="text"
              id="nombreEvaluado"
              className="form-input"
              placeholder="Ej: Juan Pérez"
              value={nombreEvaluado}
              onChange={(e) => setNombreEvaluado(e.target.value)}
            />
            <p className="form-hint">
              El nombre se usará para personalizar el mensaje al compartir
            </p>
          </div>

          {/* Link generado */}
          <div className="link-section">
            <label>Link Generado</label>
            <div className="link-container">
              <input
                type="text"
                className="link-input"
                value={linkGenerado}
                readOnly
              />
              <button
                className={`btn btn-copy ${copiado ? "copied" : ""}`}
                onClick={handleCopiarLink}
              >
                {copiado ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copiado
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Opciones de compartir */}
          <div className="share-section">
            <label>Compartir por</label>
            <div className="share-buttons">
              <button
                className="btn-share btn-share-whatsapp"
                onClick={handleCompartirWhatsApp}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
              <button
                className="btn-share btn-share-email"
                onClick={handleCompartirEmail}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email
              </button>
            </div>
          </div>

          {/* Toggle QR */}
          <div className="qr-toggle-section">
            <button
              className="btn-toggle-qr"
              onClick={() => setShowQR(!showQR)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              {showQR ? "Ocultar" : "Mostrar"} Código QR
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`chevron ${showQR ? "rotate" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* QR Code */}
          {showQR && (
            <div className="qr-section">
              <div className="qr-container">
                <img src={qrCode} alt="Código QR" className="qr-image" />
              </div>
              <button className="btn btn-secondary" onClick={handleDescargarQR}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar QR
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleCopiarLink}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copiar Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGenerarLink;
