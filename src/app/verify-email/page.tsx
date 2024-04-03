"use client";
import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import useSendVerificationEmail from "../hooks/useSendVerificationEmail";
import useProfile from "../hooks/useProfile";

export default function VerifyEmailPage() {
  const router = useRouter();
  const gray50 = useColorModeValue("gray.50", "gray.800");
  const whiteGray700 = useColorModeValue("white", "gray.700");
  const gray800 = useColorModeValue("gray.800", "gray.400");

  const { sendVerificationEmail, success } = useSendVerificationEmail();
  const { emailToVerify, profile, loading, fetchProfile } = useProfile();
  const toast = useToast();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (profile.isVerified) router.replace("/");

  const handleRefreshing = () => {
    fetchProfile();
    if (profile.isVerified) router.replace("/");
  };

  const handleResendVerification = () => {
    if (emailToVerify) sendVerificationEmail(emailToVerify);
    if (success)
      toast({
        title: "Send email verification link",
        description: "New email link verification has sent.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
  };

  const handleCheckEmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  if (!profile.isVerified)
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={gray50}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"sm"}
          bg={whiteGray700}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Verify your Email
            </Heading>
          </Center>
          <Center fontSize={{ base: "sm", sm: "md" }} color={gray800}>
            Verify your account in your email inbox
          </Center>
          <Stack spacing={6}>
            <Button
              onClick={handleCheckEmail}
              isLoading={loading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Check My Email
            </Button>
            <Button
              onClick={handleRefreshing}
              isLoading={loading}
              loadingText="Refreshing..."
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
            >
              Refresh
            </Button>
            <Button
              onClick={handleResendVerification}
              isLoading={loading}
              bg={"orange.400"}
              color={"white"}
              _hover={{
                bg: "orange.500",
              }}
            >
              Resend Verification
            </Button>

            <Button
              onClick={() => {
                googleLogout();
                localStorage.removeItem("token");
                router.replace("/login");
              }}
              isLoading={loading}
              bg={"red.400"}
              color={"white"}
              _hover={{
                bg: "red.500",
              }}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
}
