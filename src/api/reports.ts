import { API_CONFIG } from './config';
import { post } from './http';
import { ReportData } from '../types/reports';

export async function addReport(
  report: ReportData,
  accessToken: string
): Promise<void> {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.reports}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await post<void, ReportData>(url, report, headers);
}
