"use client";

import { useState } from "react";
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
} from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut, FiMoreHorizontal } from "react-icons/fi";
import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: any) => {
    if (item === "logout") {
      router.push("/login");
      Cookies.remove("comminq_auth_token");
      Cookies.remove("comminq_google_auth_token");
      googleLogout();
    }
  };

  return (
    <Menu placement="top-end" isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
          <Avatar size="sm" name="Username" src="/path/to/profile-picture.jpg">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text fontSize="sm" ml="3">
            Username
          </Text>
          <Spacer />
          <Box as={FiMoreHorizontal} size="20px" color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleMenuItemClick("Profile")}>
          <HStack spacing="2">
            <Box as={FiUser} size="18px" />
            <Text>Profile</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Settings")}>
          <HStack spacing="2">
            <Box as={FiSettings} size="18px" />
            <Text>Settings</Text>
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
