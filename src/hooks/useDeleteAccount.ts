import userService from "@/services/userService";
import { logError, logResult } from "@/utils/debugUtils";
import { useEffect, useState } from "react";

const useDeleteAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAccount = (id: string) => {
    setLoading(true);
    userService
      .deleteProfile(id)
      .then(() => {
        setSuccess(true);
        logResult("Account deleted successfully");
      })
      .catch((error: any) => {
        let errorMessage = "An error occurred while deleting the account.";
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

  return { loading, success, error, deleteAccount };
};

export default useDeleteAccount;
