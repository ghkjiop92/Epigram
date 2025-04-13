'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  textChildren?: string;
}

export default function Dropdown({
  onEdit,
  onDelete,
  textChildren = '수정하기',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.toggleButton}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="10" r="2.5" fill="#79747E" />
          <circle cx="20" cy="20" r="2.5" fill="#79747E" />
          <circle cx="20" cy="30" r="2.5" fill="#79747E" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            className={styles.dropdownContent}
            role="menu"
            aria-orientation="vertical"
          >
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className={styles.menuItem}
            >
              {textChildren}
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className={styles.menuItem}
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
