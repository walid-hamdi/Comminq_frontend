import { mainApiClient, googleApiClient } from "./apiClient";

class HttpService<TProfile, TAuth> {
  private endpoint: string;
  private controller: AbortController;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.controller = new AbortController();
  }

  profile() {
    const request = mainApiClient.get<TProfile>(`${this.endpoint}/profile`, {
      signal: this.controller.signal,
      withCredentials: true,
    });

    return {
      request,
      cancel: () => this.controller.abort(),
    };
  }

  async login(data: any) {
    return await mainApiClient.post<TAuth>(`${this.endpoint}/login`, data, {
      withCredentials: true,
    });
  }

  async getGoogleUserInfo(access_token: string) {
    return await googleApiClient.get<TProfile>("/", {
      params: {
        access_token: access_token,
      },
    });
  }

  // save if the info coming from google auth user new or login otherwise
  async userGoogleLogin(data: any) {
    return await mainApiClient.post<TAuth>(
      `${this.endpoint}/google-login`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  async register(data: any) {
    return await mainApiClient.post<TAuth>(`${this.endpoint}/register`, data, {
      withCredentials: true,
    });
  }

  async logout() {
    return await mainApiClient.get(`${this.endpoint}/logout`, {
      withCredentials: true,
    });
  }
}

const create = <TProfile, TAuth>(endpoint: string) =>
  new HttpService<TProfile, TAuth>(endpoint);

export default create;
