import React from 'react';
import styles from './Card.module.css'; 

interface CardProps{
    quote:string;
    author:string;
    emotiontag:string[];
}

const Card =({quote, author,emotiontag }: CardProps)=>{
    return (
        <div className={styles.card}>
        <p className={styles.quote}>{quote}</p>
        <p className={styles.author}>{author}</p>


      {emotiontag.map((tag) => (
        <span key={tag}>#{tag}</span>
      ))}
    </div>
    )
}

export default Card;