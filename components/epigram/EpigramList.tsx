'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteEpigrams } from '../../app/lib/hooks/useInfiniteEpigrams';
import FeedCard from '../common/Card/FeedCard';
import WideButton from '../WideButton';
import epigramStyles from './EpigramList.module.scss';

const EpigramList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteEpigrams();

  const router = useRouter();

  const allEpigrams = data?.pages.flatMap((page) => page.content ?? []) || [];

  const uniqueEpigrams = Array.from(
    new Map(allEpigrams.map((e) => [e.id, e])).values(),
  );

  if (isLoading) return <p className={epigramStyles.notice}>로딩 중...</p>;
  if (isError)
    return <p className={epigramStyles.notice}>불러오는 데 실패했습니다.</p>;
  console.log('👉 hasNextPage:', hasNextPage);
  console.log('👉 isFetchingNextPage:', isFetchingNextPage);
  console.log('👉 allEpigrams:', allEpigrams);

  return (
    <div className={epigramStyles.container}>
      <div className={epigramStyles.grid}>
        {uniqueEpigrams
          .filter((e) => e?.content && e?.author)
          .map((epigram) => (
            <FeedCard
              key={epigram.id}
              quote={epigram.content}
              author={epigram.author}
              emotiontag={epigram.tags?.split(',') || []}
            />
          ))}
      </div>

      <div className={epigramStyles.moreButtonWrapper}>
        <button
          onClick={() => fetchNextPage()}
          className={epigramStyles.moreButton}
        >
          + 에피그램 더보기
        </button>
      </div>

      <div className={epigramStyles.createButtonWrapper}>
        <WideButton onClick={() => router.push('/addepigram')}>
          + 에픽그램 만들기
        </WideButton>
      </div>
    </div>
  );
};

export default EpigramList;
