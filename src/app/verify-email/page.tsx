"use client";
import React, { useEffect } from "react";
import {
  Button,
  Center,
  Flex,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import useProfile from "../hooks/useProfile";

export default function VerifyEmailForm() {
  const router = useRouter();
  const gray50 = useColorModeValue("gray.50", "gray.800");
  const whiteGray700 = useColorModeValue("white", "gray.700");
  const gray800 = useColorModeValue("gray.800", "gray.400");

  const { profile, error, loading, refetchProfile } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (profile && !error) router.replace("/");

  const handleCheckEmail = () => {
    // Uncomment and modify as needed
    // userService
    //   .verifyCode(email, code)
    //   .then((response) => {
    //     logResult(`Verify code response: ${response}`);
    //   })
    //   .catch((error) => {
    //     logResult(`Verify code error: ${error}`);
    //   })
    //   .finally(() => {});

    // Redirect to Gmail inbox
    window.open("https://mail.google.com", "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
    googleLogout();
  };

  if (error === "Email is not verified. Please verify your email.")
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
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Check My Email
            </Button>
            <Button
              onClick={handleLogout}
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
