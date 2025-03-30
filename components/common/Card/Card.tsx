import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  quote: string;
  author: string;
  emotiontag: string[];
}
const Card = ({ quote, author, emotiontag }: CardProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.quote}>{quote}</p>
        <p className={styles.author}>-{author}-</p>
        <div className={styles.separator} />
      </div>

      <div className={styles.emotiontag}>
        {emotiontag.map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
