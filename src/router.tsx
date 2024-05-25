import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/default';
import { PATH } from './path';

import HomePage from './pages/home';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import AddReportPage from './pages/add-report';
import PredictionPage from './pages/predict';
import BatchPredictionPage from './pages/batch-predict';
import VisualizePage from './pages/visualize';

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
            element={<AddReportPage />}
          />
          <Route
            path={`/${PATH.predictions.group}`}
            element={<PredictionPage />}
          />
          <Route
            path={`/${PATH.predictions.group}/${PATH.predictions.batchPrediction}`}
            element={<BatchPredictionPage />}
          />
          <Route
            path={`/${PATH.visualization.group}`}
            element={<VisualizePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
