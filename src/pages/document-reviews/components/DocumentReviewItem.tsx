import type {
  DocumentReview,
  DocumentReviewStatus,
} from '../types/documentReview.types';

interface DocumentReviewItemProps {
  documentReview: DocumentReview;
}

const STATUS_LABELS: Record<DocumentReviewStatus, string> = {
  pending: '대기중',
  approved: '승인',
  rejected: '반려',
};

const documentReviewDateFormatter = new Intl.DateTimeFormat('ko-KR', {
  day: '2-digit',
  month: '2-digit',
  timeZone: 'Asia/Seoul',
  year: 'numeric',
});

const formatSubmittedAt = (submittedAt: string) => {
  const dateParts = Object.fromEntries(
    documentReviewDateFormatter
      .formatToParts(new Date(submittedAt))
      .map(({ type, value }) => [type, value]),
  );

  return `${dateParts.year}.${dateParts.month}.${dateParts.day}`;
};

export const DocumentReviewItem = ({
  documentReview,
}: DocumentReviewItemProps) => {
  const { applicantName, status, submittedAt } = documentReview;

  return (
    <li className="flex h-[59px] items-center px-4 py-[7px]">
      <article className="flex h-[45px] w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <h2 className="text-body-sb-16 truncate text-gray-800">
            {applicantName}
          </h2>
          <time
            className="text-caption-m-12 truncate text-gray-500"
            dateTime={submittedAt}
          >
            {formatSubmittedAt(submittedAt)}
          </time>
        </div>

        <span className="text-caption-m-10 shrink-0 rounded-sm bg-gray-800 px-2 py-[3px] text-white">
          {STATUS_LABELS[status]}
        </span>
      </article>
    </li>
  );
};
