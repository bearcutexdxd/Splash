import React from 'react';
import styles from './Modal.module.scss';

function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}`
        : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${styles.modalContent} ${styles.active}`
          : styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
