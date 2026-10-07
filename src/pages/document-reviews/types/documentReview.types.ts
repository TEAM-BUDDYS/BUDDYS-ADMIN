export type DocumentReviewStatus = 'pending' | 'approved' | 'rejected';

export type DocumentReviewFilter = 'all' | DocumentReviewStatus;

export interface DocumentReview {
  id: number;
  applicantName: string;
  requestedAt: string;
  status: DocumentReviewStatus;
}
