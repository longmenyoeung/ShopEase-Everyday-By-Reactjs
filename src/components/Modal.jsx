import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/** Native dialog supplies modal focus trapping, Escape support, and inert background. */
export default function Modal({ open, onClose, title, children, drawer = false }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={drawer ? 'modal cart-drawer' : 'modal info-modal'}
      aria-label={title}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X size={23} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
