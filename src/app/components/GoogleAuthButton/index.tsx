import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

export default function GoogleButton() {
  const { googleLogin, isLoading } = useGoogleAuth();

  return (
    <Center>
      <Button
        onClick={() => googleLogin()}
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
