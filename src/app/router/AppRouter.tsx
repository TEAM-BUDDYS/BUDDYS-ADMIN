import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

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
                  successPath={ROUTES.LANDING}
                />
              }
            />
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
