import { useState } from "react";
import userService from "../services/userService";
import { logError, logResult } from "../utils/debugUtils";

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
    setError(null);
    userService
      .changePassword(id, currentPassword, newPassword)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setSuccess(true);
          logResult("Password changed successfully");
        } else {
          setError(
            "Failed to change password. Unexpected status: " + response.status
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = "An error occurred while changing the password.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }
        setError(errorMessage);
      });
  };

  return { loading, success, error, changePassword };
};

export default useChangePassword;
