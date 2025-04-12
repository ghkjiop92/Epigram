'use client';

import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/react-query';
import axios from 'axios';
export interface Epigram {
  id: number;
  quote: string;
  author: string;
  emotiontag: string[];
}

export interface EpigramResponse {
  content: Epigram[];
  page: number;
  hasNext: boolean;
}

export const useInfiniteEpigrams = (): UseInfiniteQueryResult<
  InfiniteData<EpigramResponse>,
  Error
> => {
  return useInfiniteQuery<EpigramResponse, Error>({
    queryKey: ['epigrams'],
    queryFn: async ({ pageParam = 1 }) => {
      console.log('[fetch] 요청 페이지:', pageParam);
      const res = await axios.get<EpigramResponse>(
        `/api/epigram?page=${pageParam}&size=6`,
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
