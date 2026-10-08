import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { isDocumentReviewsForbiddenError } from '../api/documentReviews.api';
import { documentReviewsInfiniteQueryOptions } from '../api/documentReviews.query';
import type { DocumentReviewFilter } from '../types/documentReview.types';

export const useDocumentReviews = (
  filter: DocumentReviewFilter,
  userId: number | null,
) => {
  const query = useInfiniteQuery(
    documentReviewsInfiniteQueryOptions(filter, userId),
  );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    isPending,
    refetch,
  } = query;

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchNextPageError) {
      return;
    }

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError]);

  const retryInitialLoad = useCallback(() => {
    void refetch();
  }, [refetch]);

  const retryNextPage = useCallback(() => {
    if (!isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage]);

  return {
    documentReviews: data?.pages.flatMap((page) => page.documentReviews) ?? [],
    hasNextPage,
    isForbidden: isDocumentReviewsForbiddenError(error),
    isInitialError: isError && data === undefined,
    isInitialLoading: isPending,
    isLoadingNextPage: isFetchingNextPage,
    isNextPageError: isFetchNextPageError,
    loadMore,
    retryInitialLoad,
    retryNextPage,
  };
};
