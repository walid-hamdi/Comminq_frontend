import create from "./httpService";

export interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
}

export default create<GoogleUserInfo, string>("/userinfo");
