'use client';

import React from 'react';
import Card from '../../components/common/Card';

export default function CardPage() {
  return (
    <div>
      <Card
        quote="오랫동안 꿈을 그리는 사람은 그 꿈을 닮아간다."
        author="앙드레 말로"
        emotiontag={['동기부여', '짧은명언']}
      />
    </div>
  );
}
