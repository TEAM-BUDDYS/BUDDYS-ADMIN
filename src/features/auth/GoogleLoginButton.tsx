import { useState } from 'react';

import { Button } from '../../shared/ui/Button';
import { GoogleIcon } from '../../shared/ui/icons';
import { createGoogleAuthorizeUrl } from './googleOAuth';

const LOGIN_ERROR_MESSAGE =
  '로그인 화면을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.';

export const GoogleLoginButton = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginClick = () => {
    setErrorMessage(null);
    setIsRedirecting(true);

    try {
      window.location.assign(createGoogleAuthorizeUrl());
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
        aria-describedby={errorMessage ? 'google-login-error' : undefined}
        className="border border-gray-200 bg-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isRedirecting}
        icon={<GoogleIcon />}
        iconSize="lg"
        onClick={handleLoginClick}
        variant="login"
      >
        {isRedirecting ? 'Google로 이동 중' : 'Google로 로그인'}
      </Button>

      {errorMessage ? (
        <p
          className="text-body-r-14 text-error text-center"
          id="google-login-error"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
