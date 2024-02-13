import { apiClient } from "./apiClient";

class HttpService<TProfile, TAuth> {
  private endpoint: string;
  private controller: AbortController;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.controller = new AbortController();
  }

  async profile() {
    return await apiClient.get<TProfile>(`${this.endpoint}/profile`);
  }

  async login(data: { email: string; password: string }) {
    return await apiClient.post<TAuth>(`${this.endpoint}/login`, data);
  }

  async googleLogin(access_token: string) {
    return await apiClient.post<TAuth>(`${this.endpoint}/google-login`, {
      access_token,
    });
  }

  async register(data: { name: string; email: string; password: string }) {
    return await apiClient.post<TAuth>(`${this.endpoint}/register`, data);
  }

  async logout() {
    return await apiClient.get(`${this.endpoint}/logout`);
  }

  async updateProfile(id: string, data: any, profilePicture: File | null) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    return await apiClient.patch<TProfile>(`${this.endpoint}/${id}`, formData);
  }

  async deleteProfile(id: string) {
    return await apiClient.delete(`${this.endpoint}/${id}`, {
      withCredentials: true,
    });
  }

  async verifyEmail(token: string) {
    return await apiClient.get(`${this.endpoint}/verify-email/${token}`);
  }

  async resendVerificationEmail(email: string) {
    return await apiClient.post(`${this.endpoint}/resend-verification-email`, {
      email,
    });
  }

  async forgotPassword(email: string) {
    return await apiClient.post(`${this.endpoint}/forgot-password`, { email });
  }

  async verifyCode(email: string, code: string) {
    return await apiClient.post(`${this.endpoint}/verify-code`, {
      email,
      code,
    });
  }

  async changePasswordByCode(code: string, newPassword: string) {
    return await apiClient.post(`${this.endpoint}/password/reset`, {
      code,
      newPassword,
    });
  }

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ) {
    return await apiClient.put(`${this.endpoint}/${id}/password`, {
      currentPassword,
      newPassword,
    });
  }
}

const create = <TProfile, TAuth>(endpoint: string) =>
  new HttpService<TProfile, TAuth>(endpoint);

export default create;
