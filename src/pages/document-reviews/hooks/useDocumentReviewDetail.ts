import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import {
  isDocumentReviewForbiddenError,
  isDocumentReviewNotFoundError,
} from '../api/documentReviews.api';
import { documentReviewDetailQueryOptions } from '../api/documentReviews.query';

export const useDocumentReviewDetail = (
  verificationId: number | null,
  userId: number | null,
) => {
  const { data, error, isError, isPending, refetch } = useQuery(
    documentReviewDetailQueryOptions(verificationId, userId),
  );

  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  const isForbidden = isDocumentReviewForbiddenError(error);
  const isNotFound = isDocumentReviewNotFoundError(error);

  return {
    documentReview: data,
    isError: isError && !isForbidden && !isNotFound,
    isForbidden,
    isLoading: isPending,
    isNotFound,
    retry,
  };
};
