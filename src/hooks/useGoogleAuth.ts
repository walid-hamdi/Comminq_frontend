import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import userService from "@/services/userService";

const useGoogleAuth = () => {
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [userData, setUserData] = useState<any>();

  useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse && codeResponse.access_token)
        setUserAccessToken(codeResponse.access_token);
    },
    onError: (error: any) => {
      setError("An Error occurred during login");
    },
  });

  useEffect(() => {
    if (userAccessToken) {
      setLoading(true);
      userService
        .getGoogleUserInfo(userAccessToken)
        .then((response) => {
          setUserData(response.data);
          setError(undefined);
        })
        .catch((error) => {
          let errorMessage = "An error occurred during login.";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          )
            errorMessage = error.response.data.error;

          setError(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userAccessToken, userData]);

  return { userData, isLoading, error };
};

export default useGoogleAuth;
