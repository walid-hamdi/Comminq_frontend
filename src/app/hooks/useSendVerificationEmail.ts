import { useState } from "react";
import userService from "../services/userService";
import { logError } from "../utils/debugUtils";

const useSendVerificationEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendVerificationEmail = (email: string) => {
    setLoading(true);
    setError(null);
    userService
      .resendVerificationEmail(email)
      .then((response: any) => {
        setLoading(false);
        if (response === 200) setSuccess(true);
      })
      .catch((error: any) => {
        setLoading(false);
        let errorMessage =
          "An error occurred while sending an email link verification.";
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

  return { loading, success, error, sendVerificationEmail };
};

export default useSendVerificationEmail;
