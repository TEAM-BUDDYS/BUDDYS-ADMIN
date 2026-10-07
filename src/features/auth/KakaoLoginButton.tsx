import { useState } from 'react';

import { Button } from '../../shared/ui/Button';
import { KakaoIcon } from '../../shared/ui/icons';
import { createKakaoAuthorizeUrl } from './kakaoOAuth';

const LOGIN_ERROR_MESSAGE =
  '로그인 화면을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.';

export const KakaoLoginButton = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginClick = () => {
    setErrorMessage(null);
    setIsRedirecting(true);

    try {
      window.location.assign(createKakaoAuthorizeUrl());
    } catch {
      setIsRedirecting(false);
      setErrorMessage(LOGIN_ERROR_MESSAGE);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        align="center"
        aria-busy={isRedirecting}
        aria-describedby={errorMessage ? 'kakao-login-error' : undefined}
        className="bg-[#fae100] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isRedirecting}
        icon={<KakaoIcon />}
        iconSize="lg"
        onClick={handleLoginClick}
        variant="login"
      >
        {isRedirecting ? '카카오로 이동 중' : '카카오로 로그인'}
      </Button>

      {errorMessage ? (
        <p
          className="text-body-r-14 text-error text-center"
          id="kakao-login-error"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
