import { KakaoCallback } from '../../features/auth/KakaoCallback';

interface KakaoCallbackPageProps {
  loginPath: string;
  successPath: string;
}

export const KakaoCallbackPage = ({
  loginPath,
  successPath,
}: KakaoCallbackPageProps) => {
  return <KakaoCallback loginPath={loginPath} successPath={successPath} />;
};
