import create from "./httpService";

export interface ResponseProfile {
  name: string;
  email: string;
  password: string;
  picture: string;
}

export default create<ResponseProfile, string>("api/user");
