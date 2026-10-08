import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { Button } from '../../shared/ui/Button';
import { useAuthSession } from './authSessionContext';
import { getKakaoRedirectUri, validateKakaoOAuthState } from './kakaoOAuth';

interface KakaoCallbackProps {
  loginPath: string;
  successPath: string;
}

const DEFAULT_CALLBACK_ERROR_MESSAGE =
  '잠시 후 다시 시도하거나 로그인 정보를 확인해 주세요.';

export const KakaoCallback = ({
  loginPath,
  successPath,
}: KakaoCallbackProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authenticateWithKakao } = useAuthSession();
  const hasStartedRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const oauthError = searchParams.get('error');

    window.history.replaceState(
      window.history.state,
      '',
      window.location.pathname,
    );

    if (oauthError || !code || !validateKakaoOAuthState(state)) {
      queueMicrotask(() => {
        setErrorMessage(DEFAULT_CALLBACK_ERROR_MESSAGE);
      });
      return;
    }

    const completeKakaoLogin = async () => {
      await authenticateWithKakao({
        code,
        redirectUri: getKakaoRedirectUri(),
      });

      navigate(successPath, { replace: true });
    };

    void completeKakaoLogin().catch((error: unknown) => {
      setErrorMessage(
        error instanceof Error ? error.message : DEFAULT_CALLBACK_ERROR_MESSAGE,
      );
    });
  }, [authenticateWithKakao, navigate, searchParams, successPath]);

  if (errorMessage) {
    return (
      <main className="flex min-h-dvh flex-col px-4 pb-8.5">
        <section
          aria-live="assertive"
          className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <h1 className="text-title-b-22 text-gray-800">로그인에 실패했어요</h1>
          <p className="text-body-m-15 max-w-70 text-gray-500">
            {errorMessage}
          </p>
        </section>

        <Button onClick={() => navigate(loginPath, { replace: true })}>
          로그인 화면으로 돌아가기
        </Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 text-center">
      <div aria-live="polite" className="flex flex-col gap-2" role="status">
        <h1 className="text-title-b-22 text-gray-800">로그인 중</h1>
        <p className="text-body-m-15 text-gray-500">
          카카오 계정을 확인하고 있어요.
        </p>
      </div>
    </main>
  );
};
