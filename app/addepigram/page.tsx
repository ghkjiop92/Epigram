'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../..//components/common/InputField';
import styles from './AddEpigramPage.module.scss';

export default function AddEpigramPage() {
  const router = useRouter();

  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [authorOption, setAuthorOption] = useState<
    'self' | 'unknown' | 'custom'
  >('self');
  const [customAuthor, setCustomAuthor] = useState('');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [error, setError] = useState('');

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (tags.length >= 3)
      return setError('태그는 최대 3개까지 입력할 수 있어요.');
    if (trimmed.length > 10) return setError('한 태그는 10자 이하여야 합니다.');
    if (tags.includes(trimmed)) return setError('중복된 태그입니다.');
    setTags([...tags, trimmed]);
    setTagInput('');
    setError('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (content.length > 500)
      return setError('내용은 500자 이내로 입력해주세요.');
    if (authorOption === 'custom' && !customAuthor.trim())
      return setError('작성자 이름을 입력해주세요.');

    try {
      const res = await fetch('/api/epigram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          author: authorOption === 'custom' ? customAuthor : authorOption,
          sourceTitle,
          sourceUrl,
          tags,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        router.push(`/epigrams/${result.id}`);
      } else {
        setError(result.error || '저장에 실패했습니다.');
      }
    } catch (e) {
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>에피그램 만들기</h1>

      <label>내용</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="500자 이내로 입력해주세요."
        maxLength={600}
        rows={6}
        className={styles.textarea}
      />
      <p className={content.length > 500 ? styles.error : styles.helper}>
        {content.length} / 500자
      </p>

      <label>저자 *</label>
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            value="custom"
            checked={authorOption === 'custom'}
            onChange={() => setAuthorOption('custom')}
          />{' '}
          직접 입력
        </label>
        <label>
          <input
            type="radio"
            value="unknown"
            checked={authorOption === 'unknown'}
            onChange={() => setAuthorOption('unknown')}
          />{' '}
          알 수 없음
        </label>
        <label>
          <input
            type="radio"
            value="self"
            checked={authorOption === 'self'}
            onChange={() => setAuthorOption('self')}
          />{' '}
          본인
        </label>
      </div>
      {authorOption === 'custom' && (
        <InputField
          id="author"
          name="author"
          value={customAuthor}
          onChange={(e) => setCustomAuthor(e.target.value)}
          placeholder="저자 이름 입력"
          error={''}
        />
      )}

      <label>출처</label>
      <InputField
        id="source-title"
        name="source-title"
        value={sourceTitle}
        onChange={(e) => setSourceTitle(e.target.value)}
        placeholder="출처 제목 입력"
        error={''}
      />
      <InputField
        id="source-url"
        name="source-url"
        value={sourceUrl}
        onChange={(e) => setSourceUrl(e.target.value)}
        placeholder="URL (예: https://www.example.com)"
        error={''}
      />

      <label>태그</label>
      <InputField
        id="tag-input"
        name="tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder="입력하여 태그 작성 (최대 10자)"
        error={error}
      />

      <div className={styles.tagList}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              ❌
            </button>
          </span>
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.submit} onClick={handleSubmit}>
        작성 완료
      </button>
    </div>
  );
}
