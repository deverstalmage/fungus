'use client';

import { type ElementRef, useEffect, useRef, MouseEvent, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export default function Modal({ children, onDismiss, noDismiss = false, onClose }: { children: React.ReactNode; onDismiss?: () => void; noDismiss?: boolean; onClose?: () => void; }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function close(e: SyntheticEvent) {

    if (noDismiss) {
      e.preventDefault();
    } else {
      if (onClose) {
        e.preventDefault();
        onClose();
      } else {
        router.back();
      }
    }

  }

  function dismiss(event: MouseEvent) {
    if (onDismiss) {
      onDismiss();
    } else {
      router.back();
    }
    event.stopPropagation();
  }

  return createPortal(
    <div className={styles.modalBackdrop}>{/*  onClick={onDismiss} */}
      <dialog ref={dialogRef} className={styles.modal} onClose={close} onCancel={close}>
        <div className={styles.content}>
          {children}
        </div>
        {!noDismiss && <button onClick={dismiss} className={styles.closeButton} />}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
