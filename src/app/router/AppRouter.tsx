import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { LandingPage } from '../../pages/landing/LandingPage';
import { LoginPage } from '../../pages/login/LoginPage';
import { AppLayout } from '../layouts/AppLayout';
import { ROUTES } from './routes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage loginPath={ROUTES.LOGIN} />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to={ROUTES.LANDING} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
