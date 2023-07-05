import userService from "@/services/userService";
import { logError, logResult } from "@/utils/debugUtils";
import { useState } from "react";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = (
    id: string,
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    userService
      .changePassword(id, currentPassword, newPassword)
      .then(() => {
        setSuccess(true);
        logResult("Password changed successfully");
      })
      .catch((error) => {
        let errorMessage = "An error occurred while changing the password.";
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

  return { loading, success, error, changePassword };
};

export default useChangePassword;
