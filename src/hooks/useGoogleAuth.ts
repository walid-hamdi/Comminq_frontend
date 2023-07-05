import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import userService from "@/services/userService";
import { useRouter } from "next/navigation";
import { logError, logResult } from "@/utils/debugUtils";

export const useGoogleAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      userService
        .googleLogin(accessToken)
        .then((response) => {
          if (response.data && response.data.token) {
            localStorage.setItem("comminq-token", response.data.token);
            router.replace("/");
          }
        })
        .catch((error) => {
          let errorMessage = "An error occurred during login";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMessage = error.response.data.error;
          }
          toast({
            title: "Login Failed",
            description: errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, router, toast]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      if (codeResponse && codeResponse.access_token) {
        logResult(`Access Token: ${codeResponse.access_token}`);
        setAccessToken(codeResponse.access_token);
      }
    },
    onError: (error: any) => {
      let errorMessage = "An error occurred during login";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      logError(errorMessage);
    },
  });

  return { googleLogin, isLoading };
};
