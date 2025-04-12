'use client';

import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string; // ✅ 오타 수정 완료
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // ✅ 필요한 경우
  error?: string;
}

export default function InputField({
  id,
  name,
  type = 'text',
  value,
  placeholder, // ✅ 오타 수정 완료
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  error,
}: InputFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder} // ✅ 여기서도 수정
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={styles.input}
        data-state={value ? 'filled' : 'default'}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
