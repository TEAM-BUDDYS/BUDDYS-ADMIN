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
  DocumentReviewDetail,
  DocumentReviewListPage,
  DocumentReviewStatus,
} from '../types/documentReview.types';

type GetDocumentReviewsQuery = NonNullable<
  operations['getVerifications']['parameters']['query']
>;

type GetDocumentReviewDetailPath =
  operations['getVerification']['parameters']['path'];

type GetDocumentReviewsResponse =
  components['schemas']['BaseResponseExchangeVerificationListResponse'];

type GetDocumentReviewDetailResponse =
  components['schemas']['BaseResponseExchangeVerificationDetailResponse'];

type DocumentReviewSummary =
  components['schemas']['ExchangeVerificationSummaryResponse'];

type DocumentReviewDetailResponse =
  components['schemas']['ExchangeVerificationDetailResponse'];

type DocumentReviewApiStatus = NonNullable<DocumentReviewSummary['status']>;

type DocumentReviewBaseResponse = Pick<
  DocumentReviewSummary,
  'nickname' | 'status' | 'submittedAt' | 'verificationId'
>;

export interface GetDocumentReviewsParams {
  page: number;
  signal?: AbortSignal;
  size: number;
  status?: NonNullable<GetDocumentReviewsQuery['status']>;
}

export interface GetDocumentReviewDetailParams {
  signal?: AbortSignal;
  verificationId: GetDocumentReviewDetailPath['verificationId'];
}

type DocumentReviewRequestErrorKind = 'forbidden' | 'not-found' | 'request';

const DOCUMENT_REVIEW_REQUEST_ERROR_MESSAGES: Record<
  DocumentReviewRequestErrorKind,
  string
> = {
  forbidden: 'Document reviews access is forbidden',
  'not-found': 'Document review was not found',
  request: 'Failed to load document reviews',
};

export class DocumentReviewRequestError extends Error {
  readonly kind: DocumentReviewRequestErrorKind;

  constructor(kind: DocumentReviewRequestErrorKind) {
    super(DOCUMENT_REVIEW_REQUEST_ERROR_MESSAGES[kind]);
    this.name = 'DocumentReviewRequestError';
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

const parseDocumentReviewBase = (
  documentReview: DocumentReviewBaseResponse,
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
    throw new DocumentReviewRequestError('request');
  }

  return {
    id: verificationId,
    applicantName: nickname,
    submittedAt,
    status: DOCUMENT_REVIEW_STATUS_MAP[status],
  };
};

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const parseDocumentReviewDetail = (
  documentReview: DocumentReviewDetailResponse,
): DocumentReviewDetail => {
  const { documentUrl, originalFileName, rejectionReason } = documentReview;

  if (
    typeof documentUrl !== 'string' ||
    !isHttpUrl(documentUrl) ||
    typeof originalFileName !== 'string' ||
    (rejectionReason !== null && typeof rejectionReason !== 'string')
  ) {
    throw new DocumentReviewRequestError('request');
  }

  return {
    ...parseDocumentReviewBase(documentReview),
    documentUrl,
    originalFileName,
    rejectionReason,
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
    throw new DocumentReviewRequestError('request');
  }

  return {
    documentReviews: content.map(parseDocumentReviewBase),
    hasNext,
    page,
  };
};

const parseDocumentReviewDetailResponse = (
  response: GetDocumentReviewDetailResponse,
): DocumentReviewDetail => {
  if (
    response.success !== true ||
    response.data === undefined ||
    response.data === null
  ) {
    throw new DocumentReviewRequestError('request');
  }

  return parseDocumentReviewDetail(response.data);
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
      throw new DocumentReviewRequestError('forbidden');
    }

    throw error;
  }
};

export const getDocumentReviewDetail = async ({
  signal,
  verificationId,
}: GetDocumentReviewDetailParams): Promise<DocumentReviewDetail> => {
  try {
    const response = await apiClient
      .get(ENDPOINTS.ADMIN.VERIFICATION(verificationId), { signal })
      .json<GetDocumentReviewDetailResponse>();

    return parseDocumentReviewDetailResponse(response);
  } catch (error) {
    if (isHTTPError(error)) {
      if (error.response.status === 403) {
        throw new DocumentReviewRequestError('forbidden');
      }

      if (error.response.status === 404) {
        throw new DocumentReviewRequestError('not-found');
      }
    }

    throw error;
  }
};

export const isDocumentReviewRequestError = (
  error: unknown,
): error is DocumentReviewRequestError =>
  error instanceof DocumentReviewRequestError;

export const isDocumentReviewForbiddenError = (
  error: unknown,
): error is DocumentReviewRequestError =>
  isDocumentReviewRequestError(error) && error.kind === 'forbidden';

export const isDocumentReviewNotFoundError = (
  error: unknown,
): error is DocumentReviewRequestError =>
  isDocumentReviewRequestError(error) && error.kind === 'not-found';
