/**
 * Modelos relacionados à autenticação
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  fullName: string | null;
  userName: string;
}

