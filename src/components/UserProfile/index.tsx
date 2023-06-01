"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Avatar,
  Flex,
  Spinner,
  Text,
  Center,
  Box,
  Image,
  Stack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfileData {
  name: string;
  email: string;
  picture: string;
}

const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const { colorMode } = useColorMode();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const token = Cookies.get("comminq_auth_token");

    axios
      .get("https://comminq-backend.onrender.com/api/user/profile", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setUserProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(`Failed to fetch user profile: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const gradientColor =
    colorMode === "light"
      ? "linear(to-r, blue.200, teal.300)"
      : "linear(to-r, gray.700, purple.800)";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && (
            <Flex justify="center" align="center">
              <Alert status="error" variant="left-accent">
                <AlertIcon />
                Error: {error}
              </Alert>
            </Flex>
          )}
          {!userProfile ? (
            <Flex justify="center" align="center">
              <Alert status="info" variant="left-accent">
                <AlertIcon />
                No user profile found.
              </Alert>
            </Flex>
          ) : (
            <Box
              mb={4}
              w={"full"}
              bg={bgColor}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Box h={"120px"} w={"full"} bgGradient={gradientColor} />
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={userProfile.picture}
                  name={userProfile.name}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {userProfile.name}
                  </Heading>
                  <Text color={"gray.500"}>{userProfile.email}</Text>
                </Stack>

                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
