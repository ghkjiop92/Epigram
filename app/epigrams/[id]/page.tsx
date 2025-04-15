'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';

interface CommentType {
  id: number;
  user: string;
  createdAt: string;
  content: string;
}

export default function EpigramPage() {
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 2,
      user: 'anotherUser',
      createdAt: '2025. 4. 14. 오전 11:02:10',
      content: '저도 완전 공감합니다!',
    },
    {
      id: 1,
      user: 'minthe',
      createdAt: '2025. 4. 14. 오전 10:54:15',
      content: '정말 멋진 말이에요!',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const nextId =
      comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1;

    const newEntry: CommentType = {
      id: nextId,
      user: 'minthe',
      createdAt: new Date().toLocaleString(),
      content: newComment,
    };

    setComments((prev) => [newEntry, ...prev]);
    setNewComment('');
  };

  return (
    <div className={styles.commentSection}>
      <div className={styles.commentHeader}>댓글 ({comments.length})</div>

      <div className={styles.commentInputBox}>
        <img
          src="/images/user.png"
          alt="profile"
          className={styles.profileImg}
        />
        <input
          type="text"
          placeholder="100자 이내로 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          maxLength={100}
        />
        <button className={styles.registerBtn} onClick={handleAddComment}>
          등록하기
        </button>
      </div>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <img
              src="/images/user.png"
              alt="comment-profile"
              className={styles.commentProfile}
            />
            <div className={styles.commentBody}>
              <div className={styles.commentMeta}>
                <strong>{comment.user}</strong>
                <span className={styles.commentTime}>{comment.createdAt}</span>
              </div>
              <p className={styles.commentText}>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
