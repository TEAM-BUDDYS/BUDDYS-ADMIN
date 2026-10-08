export const ENDPOINTS = {
  ADMIN: {
    VERIFICATION: (verificationId: number) =>
      `api/v1/admin/verifications/exchange/${verificationId}`,
    VERIFICATIONS: 'api/v1/admin/verifications/exchange',
  },
  AUTH: {
    KAKAO: 'api/v1/auth/kakao',
    REISSUE: 'api/v1/auth/reissue',
  },
} as const;
