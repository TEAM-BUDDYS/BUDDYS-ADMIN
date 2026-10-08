export type DocumentReviewStatus = 'pending' | 'approved' | 'rejected';

export type DocumentReviewFilter = 'all' | DocumentReviewStatus;

export interface DocumentReview {
  id: number;
  applicantName: string;
  submittedAt: string;
  status: DocumentReviewStatus;
}

export interface DocumentReviewDetail extends DocumentReview {
  originalFileName: string;
}

export interface DocumentReviewListPage {
  documentReviews: DocumentReview[];
  hasNext: boolean;
  page: number;
}
