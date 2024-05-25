type ApiConfig = {
  baseUrl: string;
  endpoints: Record<string, string>;
  timeout?: number;
};

export const API_CONFIG: ApiConfig = {
  baseUrl: 'http://localhost:5005',
  endpoints: {
    login: '/login',
    register: '/register',
    currentUser: '/users/me',
    reports: '/reports',
    prediction: '/prediction',
    batchPrediction: '/prediction/bulk',
    constructions: '/constructions',
    metrics: '/metrics/rejection',
  },
};
