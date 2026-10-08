import type { DocumentReviewStatus } from '../types/documentReview.types';

interface DocumentReviewStatusBadgeProps {
  status: DocumentReviewStatus;
}

const STATUS_LABELS: Record<DocumentReviewStatus, string> = {
  pending: '대기중',
  approved: '승인',
  rejected: '반려',
};

export const DocumentReviewStatusBadge = ({
  status,
}: DocumentReviewStatusBadgeProps) => {
  return (
    <span className="text-caption-m-10 shrink-0 rounded-sm bg-gray-800 px-2 py-[3px] text-white">
      {STATUS_LABELS[status]}
    </span>
  );
};
