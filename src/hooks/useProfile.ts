import userService from "@/services/userService";
import { logError, logResult } from "@/utils/debugUtils";
import { useEffect, useState } from "react";

interface Profile {
  name: string;
  picture: string;
  email: string;
  password: string;
}

interface ProfileResponse {
  data: Profile;
}

interface ErrorResponse {
  error: string;
}

const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    userService
      .profile()
      .then((res: ProfileResponse) => {
        setProfile(res?.data);
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
  }, []);

  return { profile, loading, error };
};

export default useProfile;
