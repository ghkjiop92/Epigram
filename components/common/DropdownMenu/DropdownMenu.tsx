'use client';

import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DropdownMenu({ onEdit, onDelete }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.dropdownWrapper}>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        ⋮
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownContent}>
            <button className={styles.menuItem} onClick={onEdit}>
              수정하기
            </button>
            <button className={styles.menuItem} onClick={onDelete}>
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
