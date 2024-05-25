import { API_CONFIG } from './config';
import { SignInCredentials, SignUpCredentials } from './shared';
import { post, get } from './http';

type LoginResponse = {
  access_token: string;
};

type User = {
  email: string;
  id: number;
  username: string;
  role: string;
};

type RegisterResponse = {
  msg: string;
};

export async function signIn(credentials: SignInCredentials) {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`;
  return await post<LoginResponse, SignInCredentials>(url, credentials);
}

export async function signUp(credentials: SignUpCredentials) {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.register}`;
  return await post<RegisterResponse, SignUpCredentials>(url, credentials);
}

export async function getCurrentUser(accessToken: string) {
  const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.currentUser}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return await get<User>(url, headers);
}
