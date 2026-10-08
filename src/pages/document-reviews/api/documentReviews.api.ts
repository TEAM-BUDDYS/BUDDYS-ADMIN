import { isHTTPError } from 'ky';

import { apiClient } from '../../../shared/api/apiClient';
import { ENDPOINTS } from '../../../shared/api/endpoints';
import type {
  components,
  operations,
} from '../../../shared/api/generated/schema';
import { createSearchParams } from '../../../shared/api/searchParams';
import type {
  DocumentReview,
  DocumentReviewListPage,
  DocumentReviewStatus,
} from '../types/documentReview.types';

type GetDocumentReviewsQuery = NonNullable<
  operations['getVerifications']['parameters']['query']
>;

type GetDocumentReviewsResponse =
  components['schemas']['BaseResponseExchangeVerificationListResponse'];

type DocumentReviewSummary =
  components['schemas']['ExchangeVerificationSummaryResponse'];

type DocumentReviewApiStatus = NonNullable<DocumentReviewSummary['status']>;

export interface GetDocumentReviewsParams {
  page: number;
  signal?: AbortSignal;
  size: number;
  status?: NonNullable<GetDocumentReviewsQuery['status']>;
}

export class DocumentReviewsRequestError extends Error {
  readonly kind: 'forbidden' | 'request';

  constructor(kind: 'forbidden' | 'request') {
    super(
      kind === 'forbidden'
        ? 'Document reviews access is forbidden'
        : 'Failed to load document reviews',
    );
    this.name = 'DocumentReviewsRequestError';
    this.kind = kind;
  }
}

const DOCUMENT_REVIEW_STATUS_MAP: Record<
  DocumentReviewApiStatus,
  DocumentReviewStatus
> = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const isDocumentReviewApiStatus = (
  status: string,
): status is DocumentReviewApiStatus =>
  Object.hasOwn(DOCUMENT_REVIEW_STATUS_MAP, status);

const parseDocumentReview = (
  documentReview: DocumentReviewSummary,
): DocumentReview => {
  const { nickname, status, submittedAt, verificationId } = documentReview;

  if (
    typeof verificationId !== 'number' ||
    typeof nickname !== 'string' ||
    typeof submittedAt !== 'string' ||
    Number.isNaN(Date.parse(submittedAt)) ||
    typeof status !== 'string' ||
    !isDocumentReviewApiStatus(status)
  ) {
    throw new DocumentReviewsRequestError('request');
  }

  return {
    id: verificationId,
    applicantName: nickname,
    submittedAt,
    status: DOCUMENT_REVIEW_STATUS_MAP[status],
  };
};

const parseDocumentReviewsResponse = (
  response: GetDocumentReviewsResponse,
): DocumentReviewListPage => {
  const { content, hasNext, page } = response.data ?? {};

  if (
    response.success !== true ||
    !Array.isArray(content) ||
    typeof hasNext !== 'boolean' ||
    typeof page !== 'number'
  ) {
    throw new DocumentReviewsRequestError('request');
  }

  return {
    documentReviews: content.map(parseDocumentReview),
    hasNext,
    page,
  };
};

export const getDocumentReviews = async ({
  page,
  signal,
  size,
  status,
}: GetDocumentReviewsParams): Promise<DocumentReviewListPage> => {
  const searchParams = {
    page,
    size,
    status,
  } satisfies GetDocumentReviewsQuery;

  try {
    const response = await apiClient
      .get(ENDPOINTS.ADMIN.VERIFICATIONS, {
        searchParams: createSearchParams(searchParams),
        signal,
      })
      .json<GetDocumentReviewsResponse>();

    return parseDocumentReviewsResponse(response);
  } catch (error) {
    if (isHTTPError(error) && error.response.status === 403) {
      throw new DocumentReviewsRequestError('forbidden');
    }

    throw error;
  }
};

export const isDocumentReviewsForbiddenError = (
  error: unknown,
): error is DocumentReviewsRequestError =>
  error instanceof DocumentReviewsRequestError && error.kind === 'forbidden';
