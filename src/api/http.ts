import { PaginatedResponse } from '../types/http';

type RequestOptions<T> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: T;
};

type FormDataRequestOptions = {
  headers?: Record<string, string>;
  body: FormData;
};

async function httpRequest<TResponse, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody>
): Promise<TResponse> {
  const resp = await fetch(url, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(errorText || 'Request failed');
  }

  return resp.json();
}

export async function post<TResponse, TBody>(
  url: string,
  body: TBody,
  headers?: Record<string, string>
) {
  return httpRequest<TResponse, TBody>(url, {
    method: 'POST',
    headers,
    body,
  });
}

export async function get<TResponse>(
  url: string,
  headers?: Record<string, string>
) {
  return httpRequest<TResponse>(url, {
    method: 'GET',
    headers,
  });
}

export async function postFormData(
  url: string,
  options: FormDataRequestOptions
): Promise<Blob> {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      ...options.headers,
    },
    body: options.body,
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(errorText || 'Request failed');
  }

  return resp.blob();
}

export async function paginatedGet<TResponse>(
  url: string,
  headers?: Record<string, string>
): Promise<PaginatedResponse<TResponse>> {
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(errorText || 'Request failed');
  }

  const paginationHeader = resp.headers.get('X-Pagination');
  if (!paginationHeader) {
    throw new Error('Missing X-Pagination response header');
  }

  const paginationData = JSON.parse(paginationHeader);
  const body = await resp.json();

  const result = {
    pagination: paginationData,
    result: body,
  };
  return result;
}
