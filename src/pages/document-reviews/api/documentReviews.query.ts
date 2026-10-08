import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { isHTTPError } from 'ky';

import type { DocumentReviewFilter } from '../types/documentReview.types';
import {
  getDocumentReviewDetail,
  getDocumentReviews,
  isDocumentReviewRequestError,
} from './documentReviews.api';

const DOCUMENT_REVIEWS_PAGE_SIZE = 20;
const DOCUMENT_REVIEW_DETAIL_REFRESH_INTERVAL = 4 * 60_000;

const DOCUMENT_REVIEW_API_STATUS = {
  approved: 'APPROVED',
  pending: 'PENDING',
  rejected: 'REJECTED',
} as const;

export const documentReviewQueryKeys = {
  all: ['document-reviews'] as const,
  details: (userId: number | null) =>
    [...documentReviewQueryKeys.all, 'detail', userId] as const,
  detail: (userId: number | null, verificationId: number | null) =>
    [...documentReviewQueryKeys.details(userId), verificationId] as const,
  lists: (userId: number | null) =>
    [...documentReviewQueryKeys.all, 'list', userId] as const,
  list: (userId: number | null, filter: DocumentReviewFilter) =>
    [...documentReviewQueryKeys.lists(userId), filter] as const,
};

const shouldRetryDocumentReviewQuery = (failureCount: number, error: Error) => {
  if (
    isDocumentReviewRequestError(error) ||
    (isHTTPError(error) && error.response.status < 500)
  ) {
    return false;
  }

  return failureCount < 1;
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
    retry: shouldRetryDocumentReviewQuery,
    staleTime: 60_000,
  });

export const documentReviewDetailQueryOptions = (
  verificationId: number | null,
  userId: number | null,
) =>
  queryOptions({
    enabled: verificationId !== null && userId !== null,
    queryFn: ({ signal }) => {
      if (verificationId === null) {
        throw new Error('Document review ID is required');
      }

      return getDocumentReviewDetail({ signal, verificationId });
    },
    queryKey: documentReviewQueryKeys.detail(userId, verificationId),
    refetchInterval: DOCUMENT_REVIEW_DETAIL_REFRESH_INTERVAL,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    retry: shouldRetryDocumentReviewQuery,
    staleTime: DOCUMENT_REVIEW_DETAIL_REFRESH_INTERVAL,
  });
