export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  KAKAO_CALLBACK: '/auth/kakao/callback',
  ADMIN_ACCESS: '/auth/admin-access',
  ACCESS_DENIED: '/access-denied',
  DOCUMENT_REVIEWS: '/document-reviews',
  DOCUMENT_REVIEW_DETAIL: '/document-reviews/:documentReviewId',
} as const;
