import { API_CONFIG } from './config';
import { post, paginatedGet, httpDelete } from './http';
import { ReportData, ReportRecord } from '../types/reports';
import { PaginatedResponse } from '../types/http';

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

export async function rejectReport(reportId: string, accessToken: string) {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.reports}/${reportId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await httpDelete<void>(url, headers);
}

export async function submitReport(reportId: string, accessToken: string): Promise<void> {
  const url = `${API_CONFIG.baseUrl}/admin/reports/${reportId}/submit`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await post<void, null>(url, null, headers);
}

export async function getReports(
  page: number,
  pageSize: number,
  accessToken: string
): Promise<PaginatedResponse<ReportRecord[]>> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.reports}?page=${page}&page_size=${pageSize}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await paginatedGet<ReportRecord[]>(url, headers);
}