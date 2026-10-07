import type { ReactNode } from 'react';
import { useLocation } from 'react-router';

import { AuthSessionProvider } from '../../features/auth/AuthSessionProvider';
import { ROUTES } from '../router/routes';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const { pathname } = useLocation();

  return (
    <AuthSessionProvider
      shouldRestoreSession={pathname !== ROUTES.KAKAO_CALLBACK}
    >
      {children}
    </AuthSessionProvider>
  );
};
