import {
  CustomerFormInfo,
  CustomerGender,
  CustomerRole,
} from "@/entities/customer";

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  role: CustomerRole;
  gender: CustomerGender;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: CustomerFormInfo;
  accessToken: string;
  refreshToken: string;
}
