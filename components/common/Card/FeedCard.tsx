import React from 'react';
import styles from './FeedCard.module.scss';

interface FeedCardProps {
  quote: string;
  author: string;
  emotiontag: string[];
}

export default function FeedCard({ quote, author, emotiontag }: FeedCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.quote}>{quote}</div>

        <div className={styles.author}>- {author} -</div>
      </div>
      <div className={styles.separator} />
      <div className={styles.emotiontag}>
        {emotiontag.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}
