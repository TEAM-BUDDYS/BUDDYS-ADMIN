import { useState } from 'react';

import { Header } from '../../shared/ui/Header';
import { DocumentReviewFilters } from './components/DocumentReviewFilters';
import { DocumentReviewItem } from './components/DocumentReviewItem';
import type {
  DocumentReview,
  DocumentReviewFilter,
} from './types/documentReview.types';

const DOCUMENT_REVIEWS: DocumentReview[] = [
  {
    id: 1,
    applicantName: '지현',
    requestedAt: '2026.08.30',
    status: 'pending',
  },
  {
    id: 2,
    applicantName: '지현',
    requestedAt: '2026.08.30',
    status: 'approved',
  },
  {
    id: 3,
    applicantName: '지현',
    requestedAt: '2026.08.30',
    status: 'rejected',
  },
  {
    id: 4,
    applicantName: '지현',
    requestedAt: '2026.08.30',
    status: 'approved',
  },
  {
    id: 5,
    applicantName: '지현',
    requestedAt: '2026.08.30',
    status: 'approved',
  },
];

export const DocumentReviewsPage = () => {
  const [selectedFilter, setSelectedFilter] =
    useState<DocumentReviewFilter>('all');

  const filteredDocumentReviews = DOCUMENT_REVIEWS.filter(
    ({ status }) => selectedFilter === 'all' || status === selectedFilter,
  );

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
          onFilterChange={setSelectedFilter}
        />

        <ul className="mt-3.5 flex flex-col gap-3">
          {filteredDocumentReviews.map((documentReview) => (
            <DocumentReviewItem
              key={documentReview.id}
              documentReview={documentReview}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};
