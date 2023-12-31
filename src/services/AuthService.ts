import { User } from "@/models/User";
import { LoginRequest } from "@/requests/LoginRequest";
import { SignupRequest } from "@/requests/SignupRequest";
import { TokenResponse } from "@/response/TokenResponse";
import axios from "axios";

const endpoint = "/api/account";

export const login = async (loginRequest: LoginRequest): Promise<TokenResponse> => {
  const body = `username=${loginRequest.email}&password=${loginRequest.password}`;

  const { data } = await axios.post<TokenResponse>(endpoint + "/login", body);

  setTokenToLocalStorage(data.access_token);

  return data;
};

export const signup = async (signupRequest: SignupRequest): Promise<TokenResponse> => {
  const { data } = await axios.post<TokenResponse>(endpoint + "/register", signupRequest);

  setTokenToLocalStorage(data.access_token);

  return data;
};

export const refresh = async (): Promise<TokenResponse> => {
  const { data } = await axios.get<TokenResponse>(endpoint + "/refresh", {
    headers: { "Content-Type": `application/x-www-form-urlencoded` }
  });

  return data;
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await axios.get<User>(endpoint + "/me");

  return data;
};

export const logout = (): void => {
  //TODO очистка cookie
  clearToken();
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};
