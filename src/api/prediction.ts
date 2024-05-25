import { post, postFormData } from './http';
import { PredictionInput } from '../types/predict';
import { API_CONFIG } from './config';

type PredictionResult = {
  result: number;
};

// type BatchPredictionResult = {
//   result: number[];
// };

export async function getPrediction(
  input: PredictionInput,
  accessToken: string
): Promise<PredictionResult> {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.prediction}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await post<PredictionResult, PredictionInput>(url, input, headers);
}

export async function getBatchPrediction(
  csvInput: FormData,
  accessToken: string
): Promise<Blob> {
  for (const val of csvInput.values()) {
    console.log(val);
  }

  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.batchPrediction}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return await postFormData(url, {
    body: csvInput,
    headers,
  });
}
