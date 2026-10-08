import { type ChangeEvent, useState } from 'react';

import { Button } from '../../../shared/ui/Button';
import { TextArea } from '../../../shared/ui/TextArea';
import type { DocumentReviewDetail } from '../types/documentReview.types';
import { formatDocumentReviewDate } from '../utils/formatDocumentReviewDate';
import { DocumentReviewStatusBadge } from './DocumentReviewStatusBadge';

interface DocumentReviewDetailContentProps {
  actionErrorMessage: string | null;
  actionSuccessMessage: string | null;
  documentReview: DocumentReviewDetail;
  isApproving: boolean;
  isRejecting: boolean;
  onApprove: () => void;
  onReject: (rejectionReason: string) => void;
  onResetActionError: () => void;
}

export const DocumentReviewDetailContent = ({
  actionErrorMessage,
  actionSuccessMessage,
  documentReview,
  isApproving,
  isRejecting,
  onApprove,
  onReject,
  onResetActionError,
}: DocumentReviewDetailContentProps) => {
  const {
    applicantName,
    documentUrl,
    originalFileName,
    rejectionReason: initialRejectionReason,
    status,
    submittedAt,
  } = documentReview;
  const [rejectionReason, setRejectionReason] = useState(
    initialRejectionReason ?? '',
  );
  const isPending = status === 'pending';
  const isSubmitting = isApproving || isRejecting;
  const canReject =
    isPending && !isSubmitting && rejectionReason.trim().length > 0;

  const handleRejectionReasonChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRejectionReason(event.target.value);
    onResetActionError();
  };

  return (
    <main aria-busy={isSubmitting} className="flex min-h-0 flex-1 flex-col">
      {actionSuccessMessage ? (
        <p className="sr-only" role="status">
          {actionSuccessMessage}
        </p>
      ) : null}

      <section className="flex flex-col gap-4 px-4 pt-[22px]">
        <div className="flex min-h-[27px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-[9px]">
            <h1 className="text-title-b-18 truncate text-gray-800">
              {applicantName}
            </h1>
            <time
              className="text-caption-m-12 shrink-0 text-gray-500"
              dateTime={submittedAt}
            >
              {formatDocumentReviewDate(submittedAt)}
            </time>
          </div>

          <DocumentReviewStatusBadge status={status} />
        </div>

        <a
          className="text-body-m-16 focus-visible:outline-mint-300 flex h-13 items-center rounded-xl border border-gray-100 px-4 text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2"
          href={documentUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="truncate">{originalFileName}</span>
        </a>

        <div className="flex flex-col gap-4">
          <label
            className="text-body-sb-16 h-[23px] overflow-hidden text-gray-800"
            htmlFor="rejection-reason"
          >
            반려 사유
          </label>
          <TextArea
            className="[&_textarea]:text-body-r-14 min-h-20 border-gray-100 bg-white px-4 py-3.5"
            disabled={isSubmitting}
            id="rejection-reason"
            placeholder="예: 서류가 확인되지 않습니다."
            readOnly={!isPending}
            required={isPending}
            rows={2}
            value={rejectionReason}
            onChange={handleRejectionReasonChange}
          />
        </div>
      </section>

      <div className="mt-auto flex flex-col gap-2 px-4 pb-9.5">
        {actionErrorMessage ? (
          <p className="text-caption-r-12 text-error text-center" role="alert">
            {actionErrorMessage}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          <Button
            disabled={!canReject}
            variant="secondary"
            onClick={() => onReject(rejectionReason.trim())}
          >
            {isRejecting ? '처리 중...' : '반려'}
          </Button>
          <Button disabled={!isPending || isSubmitting} onClick={onApprove}>
            {isApproving ? '처리 중...' : '승인'}
          </Button>
        </div>
      </div>
    </main>
  );
};
