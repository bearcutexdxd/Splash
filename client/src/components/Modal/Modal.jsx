import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteErrorAC } from '../../redux/actions/errorAction';
import styles from './Modal.module.scss';

function Modal({ active, setActive, children }) {
  const dispatch = useDispatch();
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}`
        : styles.modal}
      onClick={() => {
        dispatch(deleteErrorAC());
        setActive(false);
      }}
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
