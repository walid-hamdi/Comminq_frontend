/*
Handle updating (
   when no changes no to call the server
   when the picture updating it show a loading in the avatar
   when the email is not in use we should set the isVerified to false and update
   when change the picture it will replace the existing one in the storage
  ) 
 
 Remove profile picture  
 Handle forgot password
 Handle verification account
 Handle protected routes
 Change to use http only cookie instead
 Use state management

*/

"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { FcAssistant } from "react-icons/fc";
import Sidebar from "./components/Sidebar";
import useProfile from "./hooks/useProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function Home() {
  const router = useRouter();
  const { error, loading } = useProfile();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);
  }, [token]);

  if (loading)
    return (
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Stack spacing={4} align="center">
          {/* <Image src="/assets/logo.png" alt="Logo" width={200} height={200} /> */}
          <Spinner size="xl" color="blue.500" />
        </Stack>
      </Box>
    );

  if (error === "Email is not verified. Please verify your email.")
    return router.replace("/verify-email");

  if (!token) return router.replace("/login");

  return (
    <Sidebar>
      <Box py={4}>
        <Stack spacing={4} as={Container} maxW={"4xl"} textAlign={"center"}>
          <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
            Comminq Community
          </Heading>
          <Text color={"gray.600"} fontSize={{ base: "lg", sm: "xl" }}>
            Join the revolution of boundless possibilities!
          </Text>
        </Stack>
        <Container maxW={"10xl"} mt={10}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            gap={3}
            justifyItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            {Array(20)
              .fill(0, 1, 20)
              .map((_, index) => (
                <Card
                  key={index}
                  heading={"Heading"}
                  icon={<Icon as={FcAssistant} w={10} h={10} />}
                  description={
                    "Lorem ipsum dolor sit amet catetur, adipisicing elit."
                  }
                  href={"#"}
                />
              ))}
          </Grid>
        </Container>
      </Box>
    </Sidebar>
  );
}
