import { ReactNode } from 'react';
import styles from './WideButton.module.scss';

interface WideButtonProps {
  children: ReactNode;
}

export default function WideButton({ children }: WideButtonProps) {
  return <button className={styles.button}>{children}</button>;
}
