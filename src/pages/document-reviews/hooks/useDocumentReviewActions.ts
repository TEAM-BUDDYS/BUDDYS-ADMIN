import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isHTTPError } from 'ky';
import { useCallback, useRef } from 'react';

import {
  approveDocumentReview,
  isDocumentReviewConflictError,
  isDocumentReviewForbiddenError,
  isDocumentReviewNotFoundError,
  rejectDocumentReview,
} from '../api/documentReviews.api';
import { documentReviewQueryKeys } from '../api/documentReviews.query';

type DocumentReviewAction =
  | { type: 'approve' }
  | { rejectionReason: string; type: 'reject' };

const getDocumentReviewActionErrorMessage = (
  error: unknown,
  action: DocumentReviewAction | undefined,
) => {
  if (isDocumentReviewConflictError(error)) {
    return '이미 처리된 요청이에요. 최신 상태를 확인해 주세요.';
  }

  if (
    action?.type === 'reject' &&
    isHTTPError(error) &&
    error.response.status === 400
  ) {
    return '입력한 내용을 확인한 뒤 다시 시도해 주세요.';
  }

  return '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.';
};

export const useDocumentReviewActions = (
  verificationId: number | null,
  userId: number | null,
) => {
  const queryClient = useQueryClient();
  const isSubmittingRef = useRef(false);

  const synchronizeDocumentReviews = useCallback(async () => {
    if (verificationId === null || userId === null) {
      return;
    }

    await Promise.all([
      queryClient.invalidateQueries({
        exact: true,
        queryKey: documentReviewQueryKeys.detail(userId, verificationId),
      }),
      queryClient.invalidateQueries({
        queryKey: documentReviewQueryKeys.lists(userId),
      }),
    ]);
  }, [queryClient, userId, verificationId]);

  const mutation = useMutation({
    mutationFn: async (action: DocumentReviewAction) => {
      if (verificationId === null || userId === null) {
        throw new Error(
          'Document review action requires an authenticated user',
        );
      }

      if (action.type === 'approve') {
        await approveDocumentReview({ verificationId });
        return;
      }

      await rejectDocumentReview({
        rejectionReason: action.rejectionReason,
        verificationId,
      });
    },
    onError: async (error) => {
      if (isDocumentReviewConflictError(error)) {
        await synchronizeDocumentReviews();
      }
    },
    onSettled: () => {
      isSubmittingRef.current = false;
    },
    onSuccess: synchronizeDocumentReviews,
    retry: false,
  });
  const { error, isError, isPending, isSuccess, mutate, reset, variables } =
    mutation;

  const submitAction = useCallback(
    (action: DocumentReviewAction) => {
      if (isSubmittingRef.current) {
        return;
      }

      isSubmittingRef.current = true;
      mutate(action);
    },
    [mutate],
  );

  const approve = useCallback(() => {
    submitAction({ type: 'approve' });
  }, [submitAction]);

  const reject = useCallback(
    (rejectionReason: string) => {
      submitAction({
        rejectionReason: rejectionReason.trim(),
        type: 'reject',
      });
    },
    [submitAction],
  );

  const isForbidden = isDocumentReviewForbiddenError(error);
  const isNotFound = isDocumentReviewNotFoundError(error);

  return {
    actionErrorMessage:
      isError && !isForbidden && !isNotFound
        ? getDocumentReviewActionErrorMessage(error, variables)
        : null,
    actionSuccessMessage: isSuccess
      ? variables?.type === 'approve'
        ? '승인이 완료됐어요.'
        : '반려가 완료됐어요.'
      : null,
    approve,
    isApproving: isPending && variables?.type === 'approve',
    isForbidden,
    isNotFound,
    isRejecting: isPending && variables?.type === 'reject',
    reject,
    resetActionError: reset,
  };
};
