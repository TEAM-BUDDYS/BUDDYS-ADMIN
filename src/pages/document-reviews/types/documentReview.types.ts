export type DocumentReviewStatus = 'pending' | 'approved' | 'rejected';

export type DocumentReviewFilter = 'all' | DocumentReviewStatus;

export interface DocumentReview {
  id: number;
  applicantName: string;
  submittedAt: string;
  status: DocumentReviewStatus;
}

export interface DocumentReviewDetail extends DocumentReview {
  documentUrl: string;
  originalFileName: string;
  rejectionReason: string | null;
}

export interface DocumentReviewListPage {
  documentReviews: DocumentReview[];
  hasNext: boolean;
  page: number;
}
