'use client';

import React from 'react';

interface Props {
  content: string;
  author: string;
  emotiontag: string[];
}

export default function EpigramCard({ content, author, emotiontag }: Props) {
  const handleShare = () => alert('공유되었습니다!');
  return (
    <div
      style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}
    >
      <p style={{ fontSize: '1.2rem' }}>{content}</p>
      <p style={{ fontStyle: 'italic', color: '#666' }}>- {author} -</p>
      <div style={{ marginTop: '0.5rem' }}>
        {emotiontag.map((tag) => (
          <span
            key={tag}
            style={{
              background: '#f1f1f1',
              borderRadius: '12px',
              padding: '4px 8px',
              marginRight: '4px',
              fontSize: '0.85rem',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
      <button
        onClick={handleShare}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: '1px solid #aaa',
        }}
      >
        공유
      </button>
    </div>
  );
}
