import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AdminRoute } from '../../features/auth/AdminRoute';
import { AccessDeniedPage } from '../../pages/access-denied/AccessDeniedPage';
import { KakaoCallbackPage } from '../../pages/kakao-callback/KakaoCallbackPage';
import { LandingPage } from '../../pages/landing/LandingPage';
import { LoginPage } from '../../pages/login/LoginPage';
import { AppLayout } from '../layouts/AppLayout';
import { AppProviders } from '../providers/AppProviders';
import { ROUTES } from './routes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<LandingPage loginPath={ROUTES.LOGIN} />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.KAKAO_CALLBACK}
              element={
                <KakaoCallbackPage
                  loginPath={ROUTES.LOGIN}
                  successPath={ROUTES.ADMIN_ACCESS}
                />
              }
            />
            <Route
              path={ROUTES.ACCESS_DENIED}
              element={<AccessDeniedPage landingPath={ROUTES.LANDING} />}
            />
            <Route
              element={
                <AdminRoute
                  accessDeniedPath={ROUTES.ACCESS_DENIED}
                  loginPath={ROUTES.LOGIN}
                />
              }
            >
              <Route
                path={ROUTES.ADMIN_ACCESS}
                element={<Navigate replace to={ROUTES.LANDING} />}
              />
            </Route>
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.LANDING} />}
            />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
};
