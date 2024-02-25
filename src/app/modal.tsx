'use client';

import { type ElementRef, useEffect, useRef, MouseEvent, ReactEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export default function Modal({ children, onDismiss }: { children: React.ReactNode; onDismiss?: () => void; }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onClose() {
    router.back();
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
      <dialog ref={dialogRef} className={styles.modal} onClose={onClose}>
        {children}
        <button onClick={dismiss} className={styles.closeButton} />
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
