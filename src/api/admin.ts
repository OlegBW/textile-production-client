import { paginatedGet, httpDelete, patch } from './http';
import { API_CONFIG } from './config';
import { PaginatedResponse } from '../types/http';
import { Log } from '../types/logs';

export async function getLogs(
  page: number,
  pageSize: number,
  accessToken: string
): Promise<PaginatedResponse<Log[]>> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.logs}?page=${page}&page_size=${pageSize}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await paginatedGet<Log[]>(url, headers);
}

export async function deleteUser(userId: number, accessToken: string): Promise<void> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.adminUser}/${userId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await httpDelete<void>(url, headers);
}

type Role = {
  role: string;
}

export async function updateUserRole(userId: number, role: Role, accessToken: string): Promise<void> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.endpoints.adminUser}/${userId}/role`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await patch<void, Role>(url, role, headers);
}