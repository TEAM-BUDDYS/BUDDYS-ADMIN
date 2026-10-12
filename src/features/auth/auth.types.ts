import type { components, operations } from '../../shared/api/generated/schema';

export type GoogleLoginParams =
  operations['googleLogin']['parameters']['query'];
export type KakaoLoginParams = operations['kakaoLogin']['parameters']['query'];
export type LoginResponse = components['schemas']['BaseResponseLoginResponse'];
export type AuthErrorResponse = components['schemas']['BaseResponse'];

export interface AuthSession {
  userId: number;
  accessToken: string;
}

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

export interface AuthSessionContextValue {
  status: AuthStatus;
  userId: number | null;
  authenticateWithGoogle: (params: GoogleLoginParams) => Promise<AuthSession>;
  authenticateWithKakao: (params: KakaoLoginParams) => Promise<AuthSession>;
  invalidateSession: () => void;
}
