import { paginatedGet, post } from './http';
import { API_CONFIG } from './config';
import { Construction } from '../types/visualize';
import { PaginatedResponse } from '../types/http';
import { Metric } from '../types/visualize';

export async function getConstructions(
  page: number,
  pageSize: number,
  accessToken: string
): Promise<PaginatedResponse<Construction[]>> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.constructions}?page=${page}&page_size=${pageSize}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await paginatedGet<Construction[]>(url, headers);
}

export async function getRejectionMetrics(
  chosenConstructions: Construction[],
  accessToken: string
): Promise<Metric[]> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.metrics}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await post<Metric[], Construction[]>(
    url,
    chosenConstructions,
    headers
  );
}
