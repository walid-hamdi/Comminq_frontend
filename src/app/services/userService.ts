import create from "./httpService";

export interface ResponseProfile {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  googleLogin: boolean;
  password: string;
  picture: {
    url: string;
    public_id: string | null;
  };
}

export default create<ResponseProfile, any>("api/user");
