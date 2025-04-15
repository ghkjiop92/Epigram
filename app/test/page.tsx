'use client';

import { useState } from 'react';
import InputField from '@/components/common/InputField';

export default function TestPage() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>InputField 테스트</h1>
      <InputField
        id="test"
        name="test"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="내용을 입력하세요"
        error={value.length < 3 ? '3자 이상 입력해주세요' : ''}
      />
    </div>
  );
}
