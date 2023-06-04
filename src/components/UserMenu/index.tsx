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
  Spinner,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FiUser, FiLogOut, FiMoreHorizontal, FiEdit } from "react-icons/fi";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import UserProfile from "../UserProfile";
import UserProfileEdit from "../UserProfileEdit";
import useProfile from "@/hooks/useProfile";
import userService from "@/services/userService";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, error, loading } = useProfile();
  const toast = useToast();
  const router = useRouter();

  const {
    isOpen: isUserProfileOpen,
    onOpen: openUserProfile,
    onClose: closeUserProfile,
  } = useDisclosure();
  const {
    isOpen: isUserProfileEditOpen,
    onOpen: openUserProfileEdit,
    onClose: closeUserProfileEdit,
  } = useDisclosure();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = async (item: string) => {
    if (item === "Logout") {
      try {
        await userService.logout();
        router.replace("/login");
      } catch (error: any) {
        let errorMessage = "An error occurred during logout.";
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      googleLogout();
    }
    if (item === "Profile") openUserProfile();

    if (item === "Edit") openUserProfileEdit();
  };

  return (
    <>
      <Menu placement="top" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Flex position="relative" display="flex" alignItems="center">
          {error && (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              Error: {error}
            </Alert>
          )}

          {loading && (
            <Spinner
              size="sm"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
          )}
          {profile && (
            <MenuButton
              as={Button}
              variant="unstyled"
              onClick={handleMenuClick}
              transition="background-color 0.2s"
              _hover={{
                bg: "rgba(16, 12, 12, 0.54)",
              }}
              px="4"
            >
              <Flex align="center" borderRadius="md">
                <>
                  <Avatar size="sm" name={profile.name} src={profile.picture}>
                    <AvatarBadge boxSize="1em" bg="green.500" />
                  </Avatar>
                  <Text fontSize="sm" ml="3">
                    {profile.name}
                  </Text>
                  <Spacer />
                  <Box as={FiMoreHorizontal} size="20px" color="gray.500" />
                </>
              </Flex>
            </MenuButton>
          )}
        </Flex>
        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick("Profile")}>
            <HStack spacing="2">
              <Box as={FiUser} size="18px" />
              <Text>Profile</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Edit")}>
            <HStack spacing="2">
              <Box as={FiEdit} size="18px" />
              <Text>Edit</Text>
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
      <UserProfile isOpen={isUserProfileOpen} onClose={closeUserProfile} />
      <UserProfileEdit
        isOpen={isUserProfileEditOpen}
        onClose={closeUserProfileEdit}
      />
    </>
  );
}
