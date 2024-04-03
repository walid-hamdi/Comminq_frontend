import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import userService, { ResponseProfile } from "../services/userService";
import { logError, logResult } from "../utils/debugUtils";
import { Profile } from "../entities/profile";

const defaultProfile: Profile = {
  id: "",
  name: "",
  picture: {
    public_id: null,
    url: "",
  },
  isVerified: false,
  googleLogin: false,
  email: "",
  password: "",
};

const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emailToVerify, setEmailToVerify] = useState<string | null>(null);

  const fetchProfile = () => {
    setError(null);
    setLoading(true);
    userService
      .profile()
      .then((response: AxiosResponse<ResponseProfile>) => {
        setLoading(false);
        if (response.status === 200) {
          setSuccess(true);
          const mappedProfile: Profile = {
            id: response.data._id,
            name: response.data.name,
            picture: response.data.picture,
            isVerified: response.data.isVerified,
            googleLogin: response.data.googleLogin,
            email: response.data.email,
            password: response.data.password,
          };
          setProfile(mappedProfile);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        let errorMessage = "An error occurred during retrieve user profile";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
          setEmailToVerify(error.response.data["email"]);
        }
        setError(errorMessage);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, success, error, emailToVerify, fetchProfile };
};

export default useProfile;
