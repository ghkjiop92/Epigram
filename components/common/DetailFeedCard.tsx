import React from 'react';
import styles from './DetailFeedCard.module.scss';

interface DetailFeedCardProps {
  content: string;
  author: string;
  emotiontag: string[];
  tags: string[];
}

export function DetailFeedCard({
  content,
  author,
  emotiontag,
  tags,
}: DetailFeedCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tagsRow}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.content}>{content}</div>
        <div className={styles.author}>- {author} -</div>
      </div>

      <div className={styles.emotionRow}>
        {emotiontag.map((emotion) => (
          <span key={emotion} className={styles.emotion}>
            #{emotion}
          </span>
        ))}
      </div>
    </div>
  );
}
