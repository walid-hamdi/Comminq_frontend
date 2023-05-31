"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Avatar,
  Text,
  Spacer,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AvatarBadge,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut, FiMoreHorizontal } from "react-icons/fi";
import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: string) => {
    if (item === "Logout") {
      router.push("/login");
      Cookies.remove("comminq_auth_token");
      googleLogout();
    }
    if (item === "Profile") {
      router.push("/profile");
    }
  };

  useEffect(() => {
    const token = Cookies.get("comminq_auth_token");

    setLoading(true);
    axios
      .get("https://comminq-backend.onrender.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { name, picture } = response.data;
        setUsername(name);
        setAvatar(picture);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <Menu placement="top" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton
        pos="absolute"
        bottom="4"
        left="0"
        right="0"
        as={Button}
        variant="unstyled"
        onClick={handleMenuClick}
        transition="background-color 0.2s"
        _hover={{
          bg: "rgba(16, 12, 12, 0.54)",
        }}
      >
        <Flex align="center" px="4" py="2" borderRadius="md">
          <Avatar size="sm" name={username} src={avatar}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text fontSize="sm" ml="3">
            {username}
          </Text>
          <Spacer />
          <Box as={FiMoreHorizontal} size="20px" color="gray.500" />
        </Flex>
        {loading && (
          <Center>
            <Spinner size="sm" />
          </Center>
        )}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleMenuItemClick("Profile")}>
          <HStack spacing="2">
            <Box as={FiUser} size="18px" />
            <Text>Profile</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Logout")}>
          <HStack spacing="2">
            <Box as={FiLogOut} size="18px" />
            <Text>Logout</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
