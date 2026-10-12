import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  setAccessToken,
  setAccessTokenRefreshHandler,
} from '../../shared/api/authToken';
import {
  loginWithGoogle,
  loginWithKakao,
  reissueAccessToken,
} from './auth.api';
import type {
  AuthSession,
  AuthStatus,
  GoogleLoginParams,
  KakaoLoginParams,
} from './auth.types';
import { AuthSessionContext } from './authSessionContext';

interface AuthSessionProviderProps {
  children: ReactNode;
  shouldRestoreSession: boolean;
}

export const AuthSessionProvider = ({
  children,
  shouldRestoreSession,
}: AuthSessionProviderProps) => {
  const hasRestoredSessionRef = useRef(false);
  const [status, setStatus] = useState<AuthStatus>('initializing');
  const [userId, setUserId] = useState<number | null>(null);

  const setAuthenticatedSession = useCallback((session: AuthSession) => {
    setAccessToken(session.accessToken);
    setUserId(session.userId);
    setStatus('authenticated');

    return session.accessToken;
  }, []);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUserId(null);
    setStatus('unauthenticated');
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const session = await reissueAccessToken();
      return setAuthenticatedSession(session);
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [clearSession, setAuthenticatedSession]);

  const authenticateWithKakao = useCallback(
    async (params: KakaoLoginParams) => {
      try {
        const session = await loginWithKakao(params);
        setAuthenticatedSession(session);
        return session;
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [clearSession, setAuthenticatedSession],
  );

  const authenticateWithGoogle = useCallback(
    async (params: GoogleLoginParams) => {
      try {
        const session = await loginWithGoogle(params);
        setAuthenticatedSession(session);
        return session;
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [clearSession, setAuthenticatedSession],
  );

  useEffect(() => {
    setAccessTokenRefreshHandler(refreshSession);

    return () => {
      setAccessTokenRefreshHandler(null);
    };
  }, [refreshSession]);

  useEffect(() => {
    queueMicrotask(() => {
      if (hasRestoredSessionRef.current) {
        return;
      }

      hasRestoredSessionRef.current = true;

      if (!shouldRestoreSession) {
        clearSession();
        return;
      }

      refreshSession().catch(() => undefined);
    });
  }, [clearSession, refreshSession, shouldRestoreSession]);

  const value = useMemo(
    () => ({
      status,
      userId,
      authenticateWithGoogle,
      authenticateWithKakao,
      invalidateSession: clearSession,
    }),
    [
      authenticateWithGoogle,
      authenticateWithKakao,
      clearSession,
      status,
      userId,
    ],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
};
