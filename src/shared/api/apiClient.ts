import ky, { type BeforeRetryHook } from 'ky';

import { getAccessToken, refreshAccessToken } from './authToken';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

const refreshAuthenticationBeforeRetry: BeforeRetryHook = async ({
  request,
  options,
}) => {
  if (options.context.skipAuthRefresh) {
    throw new Error('Authentication refresh is disabled for this request');
  }

  const accessToken = await refreshAccessToken();
  request.headers.set('Authorization', `Bearer ${accessToken}`);
};

export const apiClient = ky.create({
  prefix: API_BASE_URL,
  credentials: 'include',
  timeout: 10_000,
  retry: {
    limit: 1,
    shouldRetry: () => false,
  },
  hooks: {
    beforeRequest: [
      ({ request, options }) => {
        if (options.context.skipAuth) {
          return;
        }

        const accessToken = getAccessToken();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      ({ response, options, retryCount }) => {
        if (
          response.status === 401 &&
          !options.context.skipAuthRefresh &&
          retryCount === 0
        ) {
          return ky.retry({ delay: 0 });
        }
      },
    ],
    beforeRetry: [refreshAuthenticationBeforeRetry],
  },
});
