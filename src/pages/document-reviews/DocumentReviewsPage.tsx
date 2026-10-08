import { Navigate, useSearchParams } from 'react-router';

import { useAuthSession } from '../../features/auth/authSessionContext';
import { Header } from '../../shared/ui/Header';
import { DocumentReviewFilters } from './components/DocumentReviewFilters';
import { DocumentReviewList } from './components/DocumentReviewList';
import { useDocumentReviewInfiniteScroll } from './hooks/useDocumentReviewInfiniteScroll';
import { useDocumentReviews } from './hooks/useDocumentReviews';
import type { DocumentReviewFilter } from './types/documentReview.types';

interface DocumentReviewsPageProps {
  accessDeniedPath: string;
}

const DOCUMENT_REVIEW_FILTERS = new Set<DocumentReviewFilter>([
  'all',
  'pending',
  'approved',
  'rejected',
]);

const parseDocumentReviewFilter = (
  value: string | null,
): DocumentReviewFilter =>
  value && DOCUMENT_REVIEW_FILTERS.has(value as DocumentReviewFilter)
    ? (value as DocumentReviewFilter)
    : 'all';

export const DocumentReviewsPage = ({
  accessDeniedPath,
}: DocumentReviewsPageProps) => {
  const { userId } = useAuthSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = parseDocumentReviewFilter(searchParams.get('status'));
  const {
    documentReviews,
    hasNextPage,
    isForbidden,
    isInitialError,
    isInitialLoading,
    isLoadingNextPage,
    isNextPageError,
    loadMore,
    retryInitialLoad,
    retryNextPage,
  } = useDocumentReviews(selectedFilter, userId);
  const sentinelRef = useDocumentReviewInfiniteScroll({
    enabled: Boolean(hasNextPage && !isLoadingNextPage && !isNextPageError),
    onLoadMore: loadMore,
  });

  const handleFilterChange = (filter: DocumentReviewFilter) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (filter === 'all') {
      nextSearchParams.delete('status');
    } else {
      nextSearchParams.set('status', filter);
    }

    setSearchParams(nextSearchParams);
  };

  if (isForbidden) {
    return <Navigate replace to={accessDeniedPath} />;
  }

  return (
    <div className="min-h-dvh bg-white">
      <Header
        content={
          <h1 className="text-title-b-18 text-gray-800">서류 인증 관리</h1>
        }
        contentAlign="center"
      />

      <main>
        <DocumentReviewFilters
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />

        <DocumentReviewList
          documentReviews={documentReviews}
          hasNextPage={Boolean(hasNextPage)}
          isInitialError={isInitialError}
          isInitialLoading={isInitialLoading}
          isLoadingNextPage={isLoadingNextPage}
          isNextPageError={isNextPageError}
          sentinelRef={sentinelRef}
          onRetryInitialLoad={retryInitialLoad}
          onRetryNextPage={retryNextPage}
        />
      </main>
    </div>
  );
};
