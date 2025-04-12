import { ReactNode } from 'react';
import styles from './WideButton.module.scss';

interface WideButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function WideButton({ children, onClick }: WideButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
