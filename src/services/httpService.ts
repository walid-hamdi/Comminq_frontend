import { apiClient } from "./apiClient";

class HttpService<TProfile, TAuth> {
  private endpoint: string;
  private controller: AbortController;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.controller = new AbortController();
  }

  async profile() {
    return await apiClient.get<TProfile>(
      `${this.endpoint}/profile`,
      // "http://localhost:4000/api/user/profile",
      {
        withCredentials: true,
      }
    );
  }

  async login(data: any) {
    return await apiClient.post<TAuth>(`${this.endpoint}/login`, data, {
      withCredentials: true,
    });
  }

  async googleLogin(access_token: string) {
    const config = {
      withCredentials: true,
    };

    return await apiClient.post<TAuth>(
      `${this.endpoint}/google-login`,
      // "http://localhost:4000/api/user/google-login",
      { access_token },
      config
    );
  }

  async register(data: any) {
    return await apiClient.post<TAuth>(`${this.endpoint}/register`, data, {
      withCredentials: true,
    });
  }

  async logout() {
    return await apiClient.get(
      `${this.endpoint}/logout`,
      // "http://localhost:4000/api/user/logout",
      {
        withCredentials: true,
      }
    );
  }
}

const create = <TProfile, TAuth>(endpoint: string) =>
  new HttpService<TProfile, TAuth>(endpoint);

export default create;
