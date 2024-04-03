export interface Profile {
  id: string;
  name: string;
  picture: {
    url: string;
    public_id: string | null;
  };
  googleLogin: boolean;
  isVerified: boolean;
  email: string;
  password: string;
}
