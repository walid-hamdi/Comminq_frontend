import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import userService, { ResponseProfile } from "../services/userService";
import { logError, logResult } from "../utils/debugUtils";

interface Profile {
  id: string;
  name: string;
  picture: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

const defaultProfile: Profile = {
  id: "",
  name: "",
  picture: "",
  email: "",
  password: "",
};

const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = () => {
    setLoading(true);
    userService
      .profile()
      .then((res: AxiosResponse<ResponseProfile>) => {
        const mappedProfile: Profile = {
          id: res.data._id,
          name: res.data.name,
          picture: res.data.picture,
          email: res.data.email,
          password: res.data.password,
        };
        setProfile(mappedProfile);
        logResult(res?.data);
      })
      .catch((error: any) => {
        let errorMessage = "An error occurred during retrieve user profile";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }
        logError(errorMessage);
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refetchProfile = () => {
    fetchProfile();
  };

  return { profile, loading, error, refetchProfile };
};

export default useProfile;
