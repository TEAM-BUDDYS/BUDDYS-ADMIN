import { createContext, useContext } from 'react';

import type { AuthSessionContextValue } from './auth.types';

export const AuthSessionContext = createContext<AuthSessionContextValue | null>(
  null,
);

export const useAuthSession = () => {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider');
  }

  return context;
};
