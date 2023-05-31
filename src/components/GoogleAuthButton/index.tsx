import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UserInfo {
  access_token: string;
}

interface AuthUser {
  name: string;
  email: string;
  picture: string;
}

export default function GoogleButton() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse as UserInfo),
    onError: (error: any) => {
      setLoading(false);
      toast({
        title: "Login Failed",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log({ picture: res.data.picture });
          axios
            .post(
              "https://comminq-backend.onrender.com/api/user/google-login",
              {
                email: res.data.email,
                name: res.data.name,
                picture: res.data.picture,
              }
            )
            .then((res) => {
              Cookies.set("comminq_auth_token", res.data.token);
              setLoading(false);
              router.replace("/");
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              toast({
                title: "Error",
                description:
                  "An error occurred while retrieving user information.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast({
            title: "Error",
            description: "An error occurred while retrieving user information.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [user, toast, router]);

  return (
    <Center>
      <Button
        onClick={() => login()}
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
        isLoading={isLoading}
        loadingText="Signing in..."
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}
