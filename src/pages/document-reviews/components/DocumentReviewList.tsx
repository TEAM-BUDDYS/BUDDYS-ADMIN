import type { RefObject } from 'react';

import { Button } from '../../../shared/ui/Button';
import type { DocumentReview } from '../types/documentReview.types';
import { DocumentReviewItem } from './DocumentReviewItem';
import { DocumentReviewListSkeleton } from './DocumentReviewListSkeleton';

interface DocumentReviewListProps {
  documentReviews: DocumentReview[];
  hasNextPage: boolean;
  isInitialError: boolean;
  isInitialLoading: boolean;
  isLoadingNextPage: boolean;
  isNextPageError: boolean;
  onRetryInitialLoad: () => void;
  onRetryNextPage: () => void;
  sentinelRef: RefObject<HTMLDivElement | null>;
}

export const DocumentReviewList = ({
  documentReviews,
  hasNextPage,
  isInitialError,
  isInitialLoading,
  isLoadingNextPage,
  isNextPageError,
  onRetryInitialLoad,
  onRetryNextPage,
  sentinelRef,
}: DocumentReviewListProps) => {
  if (isInitialLoading) {
    return (
      <div
        aria-label="서류 인증 요청을 불러오는 중"
        aria-live="polite"
        role="status"
      >
        <DocumentReviewListSkeleton />
      </div>
    );
  }

  if (isInitialError) {
    return (
      <section
        aria-live="assertive"
        className="flex flex-col items-center px-4 pt-32 text-center"
      >
        <h2 className="text-title-b-18 text-gray-800">
          인증 요청을 불러오지 못했어요
        </h2>
        <p className="text-body-r-14 mt-2 text-gray-500">
          잠시 후 다시 시도해 주세요.
        </p>
        <Button
          className="mt-5 max-w-48"
          variant="secondary"
          onClick={onRetryInitialLoad}
        >
          다시 시도하기
        </Button>
      </section>
    );
  }

  if (documentReviews.length === 0) {
    return (
      <p
        className="text-body-r-14 px-4 pt-32 text-center text-gray-500"
        role="status"
      >
        해당 상태의 인증 요청이 없어요.
      </p>
    );
  }

  return (
    <>
      <ul className="mt-3.5 flex flex-col gap-3">
        {documentReviews.map((documentReview) => (
          <DocumentReviewItem
            key={documentReview.id}
            documentReview={documentReview}
          />
        ))}
      </ul>

      {isLoadingNextPage ? (
        <div
          aria-label="서류 인증 요청을 더 불러오는 중"
          aria-live="polite"
          role="status"
        >
          <DocumentReviewListSkeleton count={2} />
        </div>
      ) : null}

      {isNextPageError ? (
        <div
          aria-live="assertive"
          className="flex items-center justify-center gap-2 px-4 py-6"
        >
          <p className="text-caption-m-12 text-gray-500">
            목록을 더 불러오지 못했어요.
          </p>
          <button
            className="text-caption-m-12 focus-visible:outline-mint-300 rounded-sm font-semibold text-gray-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
            type="button"
            onClick={onRetryNextPage}
          >
            다시 시도
          </button>
        </div>
      ) : null}

      {hasNextPage ? (
        <div aria-hidden className="h-px" ref={sentinelRef} />
      ) : null}
    </>
  );
};
