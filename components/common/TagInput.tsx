'use client';

import { useState } from 'react';
import styles from './TagInput.module.scss';
import InputField from './InputField';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  error: string;
  setError: (error: string) => void;
}

export default function TagInput({
  tags,
  setTags,
  error,
  setError,
}: TagInputProps) {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const trimmed = tagInput.trim();

    if (!trimmed) return;
    if (tags.length >= 3) return setError('최대 3개의 태그만 추가할 수 있어요');
    if (trimmed.length > 10)
      return setError('한 태그는 10자 이하만 가능합니다.');
    if (tags.includes(trimmed)) return setError('중복된 태그입니다.');

    setTags([...tags, trimmed]);
    setTagInput('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <InputField
        id="tag-input"
        name="tags"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="태그를 입력 후 Enter"
        error={error}
      />

      <div className={styles.tagList}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            <button onClick={() => removeTag(tag)}>❌</button>
          </span>
        ))}
      </div>
    </div>
  );
}
