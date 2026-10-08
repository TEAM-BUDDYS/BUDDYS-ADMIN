const ADMIN_VERIFICATIONS_ENDPOINT = 'api/v1/admin/verifications/exchange';

const getAdminVerificationEndpoint = (verificationId: number) =>
  `${ADMIN_VERIFICATIONS_ENDPOINT}/${verificationId}`;

export const ENDPOINTS = {
  ADMIN: {
    VERIFICATION: getAdminVerificationEndpoint,
    VERIFICATION_APPROVE: (verificationId: number) =>
      `${getAdminVerificationEndpoint(verificationId)}/approve`,
    VERIFICATION_REJECT: (verificationId: number) =>
      `${getAdminVerificationEndpoint(verificationId)}/reject`,
    VERIFICATIONS: ADMIN_VERIFICATIONS_ENDPOINT,
  },
  AUTH: {
    KAKAO: 'api/v1/auth/kakao',
    REISSUE: 'api/v1/auth/reissue',
  },
} as const;
