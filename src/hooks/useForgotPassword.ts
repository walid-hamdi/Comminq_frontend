import userService from "@/services/userService";
import { useState } from "react";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    userService
      .forgotPassword(email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error: any) => {
        let errorMessage =
          "Failed to send the verification code. Please try again.";
        if (error.response && error.response.data && error.response.data.error)
          errorMessage = error.response.data.error;

        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerifyCode = (email: string, code: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    userService
      .verifyCode(email, code)
      .then(() => {
        setSuccess(true);
      })
      .catch((error: any) => {
        let errorMessage = "Invalid verification code. Please try again.";
        if (error.response && error.response.data && error.response.data.error)
          errorMessage = error.response.data.error;

        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResetPassword = (code: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    userService
      .changePasswordByCode(code, newPassword)
      .then(() => {
        setSuccess(true);
      })
      .catch((error: any) => {
        let errorMessage = "Failed to reset the password. Please try again.";
        if (error.response && error.response.data && error.response.data.error)
          errorMessage = error.response.data.error;

        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
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
