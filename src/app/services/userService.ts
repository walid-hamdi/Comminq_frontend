import create from "./httpService";

export interface ResponseProfile {
  _id: string;
  name: string;
  email: string;
  password: string;
  picture: string;
}

export default create<ResponseProfile, any>("api/user");
