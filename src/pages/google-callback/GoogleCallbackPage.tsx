import { GoogleCallback } from '../../features/auth/GoogleCallback';

interface GoogleCallbackPageProps {
  loginPath: string;
  successPath: string;
}

export const GoogleCallbackPage = ({
  loginPath,
  successPath,
}: GoogleCallbackPageProps) => {
  return <GoogleCallback loginPath={loginPath} successPath={successPath} />;
};
