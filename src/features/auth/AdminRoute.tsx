import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { Button } from '../../shared/ui/Button';
import { checkAdminAccess } from './adminAccess.api';
import { useAuthSession } from './authSessionContext';

interface AdminRouteProps {
  accessDeniedPath: string;
  loginPath: string;
}

type AdminAccessStatus = 'checking' | 'error' | 'forbidden' | 'granted';

interface AdminAccessState {
  status: AdminAccessStatus;
  userId: number | null;
}

const AdminAccessStatusPage = ({
  hasError = false,
  onRetry,
}: {
  hasError?: boolean;
  onRetry?: () => void;
}) => {
  if (hasError) {
    return (
      <main className="flex min-h-dvh flex-col px-4 pb-8.5">
        <section
          aria-live="assertive"
          className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <h1 className="text-title-b-22 text-gray-800">
            권한을 확인하지 못했어요
          </h1>
          <p className="text-body-m-15 max-w-70 text-gray-500">
            일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
          </p>
        </section>

        <Button onClick={onRetry}>다시 시도하기</Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 text-center">
      <div aria-live="polite" className="flex flex-col gap-2" role="status">
        <h1 className="text-title-b-22 text-gray-800">권한 확인 중</h1>
        <p className="text-body-m-15 text-gray-500">
          관리자 계정을 확인하고 있어요.
        </p>
      </div>
    </main>
  );
};

export const AdminRoute = ({
  accessDeniedPath,
  loginPath,
}: AdminRouteProps) => {
  const { invalidateSession, status, userId } = useAuthSession();
  const [attempt, setAttempt] = useState(0);
  const [accessState, setAccessState] = useState<AdminAccessState>({
    status: 'checking',
    userId: null,
  });

  useEffect(() => {
    if (status !== 'authenticated' || userId === null) {
      return;
    }

    const abortController = new AbortController();

    const verifyAdminAccess = async () => {
      try {
        const result = await checkAdminAccess(abortController.signal);

        if (abortController.signal.aborted) {
          return;
        }

        if (result === 'unauthenticated') {
          invalidateSession();
          return;
        }

        if (result === 'forbidden') {
          setAccessState({ status: 'forbidden', userId });
          return;
        }

        setAccessState({ status: 'granted', userId });
      } catch {
        if (abortController.signal.aborted) {
          return;
        }

        setAccessState({ status: 'error', userId });
      }
    };

    void verifyAdminAccess();

    return () => {
      abortController.abort();
    };
  }, [attempt, invalidateSession, status, userId]);

  if (status === 'initializing') {
    return <AdminAccessStatusPage />;
  }

  if (status === 'unauthenticated' || userId === null) {
    return <Navigate replace to={loginPath} />;
  }

  if (accessState.userId !== userId || accessState.status === 'checking') {
    return <AdminAccessStatusPage />;
  }

  if (accessState.status === 'error') {
    return (
      <AdminAccessStatusPage
        hasError
        onRetry={() => {
          setAccessState({ status: 'checking', userId });
          setAttempt((currentAttempt) => currentAttempt + 1);
        }}
      />
    );
  }

  if (accessState.status === 'forbidden') {
    return <Navigate replace to={accessDeniedPath} />;
  }

  return <Outlet />;
};
