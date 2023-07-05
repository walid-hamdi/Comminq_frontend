import userService from "@/services/userService";
import { logError, logResult } from "@/utils/debugUtils";
import { useState } from "react";

interface Profile {
  id: string;
  name: string;
  picture: string;
  email: string;
  password: string;
}

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = (
    userId: string,
    profile: Profile,
    profilePicture: File | null
  ) => {
    setLoading(true);

    const data = {
      id: profile.id,
      name: profile.name,
      picture: profile.picture,
      email: profile.email,
      password: profile.password,
    };

    userService
      .updateProfile(userId, data, profilePicture)
      .then(() => {
        setSuccess(true);
        logResult("Profile updated successfully");
      })
      .catch((error: any) => {
        let errorMessage = "An error occurred while updating the profile.";
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

  return { loading, success, error, updateProfile };
};

export default useUpdateProfile;
