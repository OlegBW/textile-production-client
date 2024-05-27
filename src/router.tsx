import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/default';
import { PATH } from './path';

import ProtectedWrapper from './components/protected';

import HomePage from './pages/home';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import AddReportPage from './pages/add-report';
import PredictionPage from './pages/predict';
import BatchPredictionPage from './pages/batch-predict';
import VisualizePage from './pages/visualize';
import LogsPage from './pages/log';
import SubmitReportPage from './pages/submit-report';
import AdminPanelPage from './pages/admin-panel'; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path={`/${PATH.auth.group}/${PATH.auth.login}`}
            element={<SignInPage />}
          />
          <Route
            path={`/${PATH.auth.group}/${PATH.auth.register}`}
            element={<SignUpPage />}
          />
          <Route
            path={`/${PATH.reports.group}/${PATH.reports.addReport}`}
            element={
              <ProtectedWrapper>
                <AddReportPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path={`/${PATH.predictions.group}`}
            element={
              <ProtectedWrapper>
                <PredictionPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path={`/${PATH.predictions.group}/${PATH.predictions.batchPrediction}`}
            element={
              <ProtectedWrapper>
                <BatchPredictionPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path={`/${PATH.visualization.group}`}
            element={
              <ProtectedWrapper>
                <VisualizePage />
              </ProtectedWrapper>
            }
          />
          <Route
            path={`/${PATH.admin.group}/${PATH.admin.log}`}
            element={
              <ProtectedWrapper>
                <LogsPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path={`/${PATH.admin.group}/${PATH.admin.reports}`}
            element={
              <ProtectedWrapper>
                <SubmitReportPage />
              </ProtectedWrapper>
            }
          />
                    <Route
            path={`/${PATH.admin.group}/${PATH.admin.users}`}
            element={
              <ProtectedWrapper>
                <AdminPanelPage />
              </ProtectedWrapper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
