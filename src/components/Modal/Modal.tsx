import { PropsWithChildren, useEffect, useId, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeOnOverlayClick?: boolean;
}

export function Modal({ isOpen, onClose, title, children, closeOnOverlayClick = true }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const body = (
    <div
      className={styles.overlay}
      onClick={closeOnOverlayClick ? onClose : undefined}
      data-testid="modal-overlay"
    >
      <div
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title ? (
            <h3 id={titleId} className={styles.title}>
              {title}
            </h3>
          ) : <span className="sr-only" id={titleId}>Dialog</span>}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(body, document.body);
}

export default Modal;
