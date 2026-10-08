import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { useLocation } from 'react-router';

import { AuthSessionProvider } from '../../features/auth/AuthSessionProvider';
import { ROUTES } from '../router/routes';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const { pathname } = useLocation();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider
        shouldRestoreSession={pathname !== ROUTES.KAKAO_CALLBACK}
      >
        {children}
      </AuthSessionProvider>
    </QueryClientProvider>
  );
};
