'use client';

import React from "react";
import ReactDOM from "react-dom";
import styles from './ProfileModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
};

const ProfileModal = ({ open, onClose, onDelete, children }: Props) => {
  if (!open) return null;

  const portalElement = document.getElementById("portal");
  if (!portalElement) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        {children}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button onClick={onClose}>닫기</button>
          {onDelete && (
            <button onClick={onDelete} style={{ background: "red", color: "white" }}>
              삭제
            </button>
          )}
        </div>
      </div>
    </>,
    portalElement
  );
};

export default ProfileModal;
