import { useLocation, useNavigate } from 'react-router';

import { Button } from '../../shared/ui/Button';
import { Header } from '../../shared/ui/Header';
import { TextArea } from '../../shared/ui/TextArea';
import { DocumentReviewStatusBadge } from './components/DocumentReviewStatusBadge';
import type { DocumentReviewDetail } from './types/documentReview.types';
import { formatDocumentReviewDate } from './utils/formatDocumentReviewDate';

interface DocumentReviewDetailPageProps {
  documentReviewsPath: string;
}

const DOCUMENT_REVIEW_DETAIL_FIXTURE: DocumentReviewDetail = {
  id: 1,
  applicantName: '지현',
  originalFileName: '교환학생 확인서.pdf',
  status: 'pending',
  submittedAt: '2026-08-30T05:20:00Z',
};

export const DocumentReviewDetailPage = ({
  documentReviewsPath,
}: DocumentReviewDetailPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { applicantName, originalFileName, status, submittedAt } =
    DOCUMENT_REVIEW_DETAIL_FIXTURE;

  const handleBackClick = () => {
    if (location.key === 'default') {
      navigate(documentReviewsPath, { replace: true });
      return;
    }

    navigate(-1);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header hasBackButton onBackClick={handleBackClick} />

      <main className="flex min-h-0 flex-1 flex-col">
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

          <div className="flex h-13 items-center rounded-xl border border-gray-100 px-4">
            <p className="text-body-m-16 truncate text-gray-800">
              {originalFileName}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <label
              className="text-body-sb-16 h-[23px] overflow-hidden text-gray-800"
              htmlFor="rejection-reason"
            >
              반려 사유
            </label>
            <TextArea
              className="[&_textarea]:text-body-r-14 min-h-20 border-gray-100 bg-white px-4 py-3.5"
              id="rejection-reason"
              placeholder="예: 서류가 확인되지 않습니다."
              rows={2}
            />
          </div>
        </section>

        <div className="mt-auto grid grid-cols-2 gap-4 px-4 pb-9.5">
          <Button variant="secondary">반려</Button>
          <Button>승인</Button>
        </div>
      </main>
    </div>
  );
};
