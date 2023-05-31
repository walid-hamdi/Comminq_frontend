"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Avatar,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const token = Cookies.get("comminq_auth_token");

    axios
      .get("https://comminq-backend.onrender.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          Error: {error}
        </Alert>
      </Flex>
    );
  }

  if (!userProfile) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Alert status="info" variant="left-accent">
          <AlertIcon />
          No user profile found.
        </Alert>
      </Flex>
    );
  }

  return (
    <Flex justify="center" direction="column" align="center" minHeight="100vh">
      <Avatar size="xl" name={userProfile.name} src={userProfile.picture} />
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        {userProfile.name}
      </Text>
      <Text fontSize="md" color="gray.500">
        {userProfile.email}
      </Text>
    </Flex>
  );
};
export default UserProfile;
