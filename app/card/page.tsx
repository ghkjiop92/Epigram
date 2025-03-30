'use client';

import React from 'react';
import Card from '../../components/common/Card';

export default function CardPage() {
  return (
    <div className="text-blue-800 bg-blue-100 p-4">
<div className="text-blue-800">
  <Card 
    quote="오랫동안 꿈을 그리는 사람은 그 꿈을 닮아간다."
    author="앙드레 말로"
    emotiontag={['나아가야할때', '꿈을 이루고 싶을때']}
  />
</div>
</div>
  );
}
