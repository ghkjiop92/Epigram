'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/globals.scss';
import Providers from '../../providers';
import styles from './layout.module.scss';
import Navbar from '../../../components/Navbar';
import DropdownMenu from '../../../components/common/DropdownMenu/DropdownMenu';
import BestLikeButton from '../../../components/BestLikeButton';

interface CommentType {
  id: number;
  user: string;
  createdAt: string;
  content: string;
}

export default function EpigramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      user: 'minthe',
      createdAt: '2025. 4. 14. 오전 10:54:15',
      content: '정말 멋진 말이에요!',
    },
    {
      id: 2,
      user: 'anotherUser',
      createdAt: '2025. 4. 14. 오전 11:02:10',
      content: '저도 완전 공감합니다!',
    },
  ]);

  const handleEdit = () => {
    router.push('/addepigram');
  };

  const handleDelete = () => {
    if (comments.length > 0) {
      setComments((prev) => prev.slice(1));
    }
  };

  return (
    <>
      <Navbar />
      <Providers>
        <div className={styles.pageWrapper}>
          <div className={styles.topSection}>
            <div className={styles.container}>
              <div className={styles.centerContainer}>
                <div className={styles.tagAndMenuRow}>
                  <div className={styles.hashTags}>
                    <span className={styles.hashTag}>#꿈을이루고싶을때</span>
                    <span className={styles.hashTag}>#나아가야할때</span>
                  </div>
                  <div className={styles.dropdownMenuWrapper}>
                    <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
                  </div>
                </div>

                <p className={styles.mainQuote}>
                  오랫동안 꿈을 그리는 사람은 마침내 그 <br /> 꿈을 닮아 간다.
                </p>

                <div className={styles.buttomRow}>
                  <p className={styles.author}>- 앙드레 말로 -</p>
                  <BestLikeButton />
                  <a
                    href="https:naver.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    왕도로 가는길
                    <span className={styles.linkIcon}>🔗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentArea}>
            {children}

            <div className={styles.commentList}>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.commentItem}>
                  <strong>{comment.user}</strong>
                  <span> · {comment.createdAt}</span>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Providers>
    </>
  );
}
