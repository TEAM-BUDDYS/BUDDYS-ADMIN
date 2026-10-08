import { isHTTPError } from 'ky';

import { apiClient } from '../../shared/api/apiClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import type { operations } from '../../shared/api/generated/schema';
import { createSearchParams } from '../../shared/api/searchParams';

type GetVerificationsParams = NonNullable<
  operations['getVerifications']['parameters']['query']
>;

export type AdminAccessResult = 'granted' | 'forbidden' | 'unauthenticated';

const ADMIN_ACCESS_CHECK_PARAMS = {
  page: 0,
  size: 1,
} satisfies GetVerificationsParams;

export const checkAdminAccess = async (
  signal: AbortSignal,
): Promise<AdminAccessResult> => {
  try {
    await apiClient.get(ENDPOINTS.ADMIN.VERIFICATIONS, {
      searchParams: createSearchParams(ADMIN_ACCESS_CHECK_PARAMS),
      signal,
    });

    return 'granted';
  } catch (error) {
    if (isHTTPError(error)) {
      if (error.response.status === 401) {
        return 'unauthenticated';
      }

      if (error.response.status === 403) {
        return 'forbidden';
      }
    }

    throw error;
  }
};
