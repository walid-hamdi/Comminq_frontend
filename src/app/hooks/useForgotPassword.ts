import { useState } from "react";
import userService from "../services/userService";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = (email: string) => {
    setLoading(true);
    setError(null);

    // Step 1: send code verification by email
    userService
      .forgotPassword(email)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setSuccess(true);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        let errorMessage =
          "Failed to send the verification code. Please try again.";
        if (error.response && error.response.data && error.response.data.error)
          errorMessage = error.response.data.error;

        setError(errorMessage);
      });
  };
  // Step 2: verify the code received by email
  const handleVerifyCode = (email: string, code: string) => {
    setLoading(true);
    setError(null);

    userService
      .verifyCode(email, code)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setSuccess(true);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        let errorMessage = "Invalid verification code. Please try again.";
        if (error.response && error.response.data && error.response.data.error)
          errorMessage = error.response.data.error;

        setError(errorMessage);
      });
  };
  // Step 3: request to change the password
  const handleResetPassword = (code: string, newPassword: string) => {
    setLoading(true);
    setError(null);

    userService
      .changePasswordByCode(code, newPassword)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setSuccess(true);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        let errorMessage = "Failed to reset the password. Please try again.";
        if (error.response && error.response.data && error.response.data.error)
          errorMessage = error.response.data.error;

        setError(errorMessage);
      });
  };

  return {
    loading,
    error,
    success,
    forgotPassword: handleForgotPassword,
    verifyCode: handleVerifyCode,
    resetPassword: handleResetPassword,
  };
};

export default useForgotPassword;
