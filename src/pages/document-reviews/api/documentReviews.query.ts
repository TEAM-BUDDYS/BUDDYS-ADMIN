import { infiniteQueryOptions } from '@tanstack/react-query';
import { isHTTPError } from 'ky';

import type { DocumentReviewFilter } from '../types/documentReview.types';
import {
  getDocumentReviews,
  isDocumentReviewsForbiddenError,
} from './documentReviews.api';

const DOCUMENT_REVIEWS_PAGE_SIZE = 20;

const DOCUMENT_REVIEW_API_STATUS = {
  approved: 'APPROVED',
  pending: 'PENDING',
  rejected: 'REJECTED',
} as const;

export const documentReviewQueryKeys = {
  all: ['document-reviews'] as const,
  list: (userId: number | null, filter: DocumentReviewFilter) =>
    [...documentReviewQueryKeys.all, 'list', userId, filter] as const,
};

export const documentReviewsInfiniteQueryOptions = (
  filter: DocumentReviewFilter,
  userId: number | null,
) =>
  infiniteQueryOptions({
    enabled: userId !== null,
    queryFn: ({ pageParam, signal }) =>
      getDocumentReviews({
        page: pageParam,
        signal,
        size: DOCUMENT_REVIEWS_PAGE_SIZE,
        status:
          filter === 'all' ? undefined : DOCUMENT_REVIEW_API_STATUS[filter],
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    initialPageParam: 0,
    queryKey: documentReviewQueryKeys.list(userId, filter),
    retry: (failureCount, error) => {
      if (
        isDocumentReviewsForbiddenError(error) ||
        (isHTTPError(error) && error.response.status < 500)
      ) {
        return false;
      }

      return failureCount < 1;
    },
    staleTime: 60_000,
  });
