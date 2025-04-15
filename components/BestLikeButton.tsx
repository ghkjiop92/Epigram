'use client';

import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import styles from './BestLikeButton.module.scss';

export default function BestLikeButton() {
  const [count, setCount] = useState(123);

  return (
    <button className={styles.likeButton} onClick={() => setCount(count + 1)}>
      <FaThumbsUp />
      {count}
    </button>
  );
}
