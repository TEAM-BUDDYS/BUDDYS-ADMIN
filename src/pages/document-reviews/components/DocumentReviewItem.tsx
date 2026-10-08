import { Link } from 'react-router';

import type { DocumentReview } from '../types/documentReview.types';
import { formatDocumentReviewDate } from '../utils/formatDocumentReviewDate';
import { DocumentReviewStatusBadge } from './DocumentReviewStatusBadge';

interface DocumentReviewItemProps {
  documentReview: DocumentReview;
}

export const DocumentReviewItem = ({
  documentReview,
}: DocumentReviewItemProps) => {
  const { applicantName, status, submittedAt } = documentReview;

  return (
    <li>
      <Link
        className="focus-visible:outline-mint-300 flex h-[59px] items-center px-4 py-[7px] focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
        to={String(documentReview.id)}
      >
        <article className="flex h-[45px] w-full items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <h2 className="text-body-sb-16 truncate text-gray-800">
              {applicantName}
            </h2>
            <time
              className="text-caption-m-12 truncate text-gray-500"
              dateTime={submittedAt}
            >
              {formatDocumentReviewDate(submittedAt)}
            </time>
          </div>

          <DocumentReviewStatusBadge status={status} />
        </article>
      </Link>
    </li>
  );
};
