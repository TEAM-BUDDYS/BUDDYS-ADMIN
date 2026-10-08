import { Navigate, useLocation, useNavigate, useParams } from 'react-router';

import { useAuthSession } from '../../features/auth/authSessionContext';
import { Button } from '../../shared/ui/Button';
import { Header } from '../../shared/ui/Header';
import { DocumentReviewDetailContent } from './components/DocumentReviewDetailContent';
import { DocumentReviewDetailSkeleton } from './components/DocumentReviewDetailSkeleton';
import { useDocumentReviewActions } from './hooks/useDocumentReviewActions';
import { useDocumentReviewDetail } from './hooks/useDocumentReviewDetail';

interface DocumentReviewDetailPageProps {
  accessDeniedPath: string;
  documentReviewsPath: string;
}

interface DocumentReviewDetailErrorProps {
  isNotFound: boolean;
  onAction: () => void;
}

const parseDocumentReviewId = (value: string | undefined) => {
  if (!value || !/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const documentReviewId = Number(value);

  return Number.isSafeInteger(documentReviewId) ? documentReviewId : null;
};

const DocumentReviewDetailError = ({
  isNotFound,
  onAction,
}: DocumentReviewDetailErrorProps) => {
  return (
    <main
      aria-live="assertive"
      className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 text-center"
    >
      <h1 className="text-title-b-18 text-gray-800">
        {isNotFound
          ? '인증 요청을 찾을 수 없어요'
          : '인증 요청을 불러오지 못했어요'}
      </h1>
      <p className="text-body-r-14 mt-2 text-gray-500">
        {isNotFound
          ? '삭제되었거나 존재하지 않는 요청이에요.'
          : '잠시 후 다시 시도해 주세요.'}
      </p>
      <Button className="mt-5 max-w-48" variant="secondary" onClick={onAction}>
        {isNotFound ? '목록으로 돌아가기' : '다시 시도하기'}
      </Button>
    </main>
  );
};

export const DocumentReviewDetailPage = ({
  accessDeniedPath,
  documentReviewsPath,
}: DocumentReviewDetailPageProps) => {
  const { userId } = useAuthSession();
  const location = useLocation();
  const navigate = useNavigate();
  const { documentReviewId: documentReviewIdParam } = useParams();
  const documentReviewId = parseDocumentReviewId(documentReviewIdParam);
  const { documentReview, isError, isForbidden, isLoading, isNotFound, retry } =
    useDocumentReviewDetail(documentReviewId, userId);
  const {
    actionErrorMessage,
    actionSuccessMessage,
    approve,
    isApproving,
    isForbidden: isActionForbidden,
    isNotFound: isActionNotFound,
    isRejecting,
    reject,
    resetActionError,
  } = useDocumentReviewActions(documentReviewId, userId);

  const handleBackClick = () => {
    if (location.key === 'default') {
      navigate(documentReviewsPath, { replace: true });
      return;
    }

    navigate(-1);
  };

  const handleNavigateToList = () => {
    navigate(documentReviewsPath, { replace: true });
  };

  if (isForbidden || isActionForbidden) {
    return <Navigate replace to={accessDeniedPath} />;
  }

  const hasInvalidId = documentReviewId === null;
  const showNotFound = hasInvalidId || isNotFound || isActionNotFound;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header hasBackButton onBackClick={handleBackClick} />

      {showNotFound ? (
        <DocumentReviewDetailError isNotFound onAction={handleNavigateToList} />
      ) : isLoading ? (
        <main className="flex min-h-0 flex-1 flex-col">
          <DocumentReviewDetailSkeleton />
        </main>
      ) : isError || !documentReview ? (
        <DocumentReviewDetailError isNotFound={false} onAction={retry} />
      ) : (
        <DocumentReviewDetailContent
          actionErrorMessage={actionErrorMessage}
          actionSuccessMessage={actionSuccessMessage}
          documentReview={documentReview}
          isApproving={isApproving}
          isRejecting={isRejecting}
          key={`${documentReview.id}:${documentReview.status}:${documentReview.rejectionReason ?? ''}`}
          onApprove={approve}
          onReject={reject}
          onResetActionError={resetActionError}
        />
      )}
    </div>
  );
};
