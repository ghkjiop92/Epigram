'use client';

import FeedCard from '../../components/common/Card/FeedCard';
import EpigramList from '../../components/epigram/EpigramList';
export default function CardPage() {
  return (
    <>
      <FeedCard
        quote="오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다."
        author="앙드레 말로"
        emotiontag={['꿈을이루고싶을때', '나아가야할때']}
      />
      <EpigramList />
    </>
  );
}
