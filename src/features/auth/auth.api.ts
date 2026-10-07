import { isHTTPError, isKyError, isNetworkError, isTimeoutError } from 'ky';

import { apiClient } from '../../shared/api/apiClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { createSearchParams } from '../../shared/api/searchParams';
import type {
  AuthErrorResponse,
  AuthSession,
  KakaoLoginParams,
  LoginResponse,
} from './auth.types';

const AUTH_REQUEST_CONTEXT = {
  skipAuth: true,
  skipAuthRefresh: true,
};

const DEFAULT_AUTH_ERROR_MESSAGE = '로그인 처리에 실패했어요.';

const getAuthErrorMessage = (error: unknown) => {
  if (isTimeoutError(error)) {
    return '요청 시간이 초과됐어요. 다시 시도해 주세요.';
  }

  if (isNetworkError(error)) {
    return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
  }

  if (isHTTPError(error)) {
    if (error.response.status >= 500) {
      return '서버에 일시적인 문제가 생겼어요. 잠시 후 다시 시도해 주세요.';
    }

    const response = error.data as AuthErrorResponse | undefined;

    return response?.message || DEFAULT_AUTH_ERROR_MESSAGE;
  }

  return DEFAULT_AUTH_ERROR_MESSAGE;
};

const requestAuthSession = async (
  request: Promise<LoginResponse>,
): Promise<AuthSession> => {
  try {
    const response = await request;

    if (
      !response.success ||
      typeof response.data?.userId !== 'number' ||
      !response.data.accessToken
    ) {
      throw new Error(response.message || DEFAULT_AUTH_ERROR_MESSAGE);
    }

    return {
      userId: response.data.userId,
      accessToken: response.data.accessToken,
    };
  } catch (error) {
    if (!isKyError(error)) {
      throw error;
    }

    throw new Error(getAuthErrorMessage(error), { cause: error });
  }
};

export const loginWithKakao = async (params: KakaoLoginParams) =>
  requestAuthSession(
    apiClient
      .post(ENDPOINTS.AUTH.KAKAO, {
        searchParams: createSearchParams(params),
        context: AUTH_REQUEST_CONTEXT,
      })
      .json<LoginResponse>(),
  );

export const reissueAccessToken = async () =>
  requestAuthSession(
    apiClient
      .post(ENDPOINTS.AUTH.REISSUE, {
        context: AUTH_REQUEST_CONTEXT,
      })
      .json<LoginResponse>(),
  );
