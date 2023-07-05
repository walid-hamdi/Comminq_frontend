"use client";
import { useEffect, useState } from "react";
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
import {
  FiUser,
  FiLogOut,
  FiUnlock,
  FiMoreHorizontal,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import UserProfile from "../UserProfile";
import useProfile from "@/hooks/useProfile";
import UserDeleteAccount from "../UserDeleteAccount";
import UserChangePassword from "../UserChangePassword";
import UserProfileEdit from "../UserProfileEdit";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, error, loading, refetchProfile } = useProfile();
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
  const {
    isOpen: isUserDeleteAccount,
    onOpen: openUserDeleteAccount,
    onClose: closeUserDeleteAccount,
  } = useDisclosure();

  const {
    isOpen: isUserChangePasswordOpen,
    onOpen: openUserChangePassword,
    onClose: closeUserChangePassword,
  } = useDisclosure();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = async (item: string) => {
    if (item === "Profile") openUserProfile();

    if (item === "Edit") openUserProfileEdit();

    if (item === "Change password") openUserChangePassword();

    if (item === "Delete") {
      openUserDeleteAccount();
    }
    if (item === "Logout") {
      try {
        // await userService.logout();
        localStorage.removeItem("comminq-token");
        router.replace("/login");
        googleLogout();
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
    }
  };

  useEffect(() => {
    if (isUserProfileEditOpen) {
      refetchProfile(); // Fetch the updated profile after closing the edit modal
    }
  }, [isUserProfileEditOpen, refetchProfile]);

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
          {profile && profile.id && (
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
              <Flex
                align="center"
                justifyContent="space-around"
                borderRadius="md"
              >
                <>
                  <Avatar size="sm" name={profile.name} src={profile.picture}>
                    <AvatarBadge boxSize="1em" bg="green.500" />
                  </Avatar>
                  <Text fontSize="sm" mx="3">
                    {profile.name}
                  </Text>

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
              <Text>Update profile</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Change password")}>
            <HStack spacing="2">
              <Box as={FiUnlock} size="18px" />
              <Text>Change password</Text>
            </HStack>
          </MenuItem>

          <MenuItem onClick={() => handleMenuItemClick("Delete")}>
            <HStack spacing="2">
              <Box as={FiTrash2} size="18px" />
              <Text>Delete account</Text>
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
      <UserProfile
        isOpen={isUserProfileOpen}
        onClose={closeUserProfile}
        initialProfile={profile}
      />

      <UserProfileEdit
        userId={profile.id}
        isOpen={isUserProfileEditOpen}
        onClose={closeUserProfileEdit}
        initialProfile={profile}
      />
      <UserChangePassword
        userId={profile.id}
        isOpen={isUserChangePasswordOpen}
        onClose={closeUserChangePassword}
      />
      <UserDeleteAccount
        isOpen={isUserDeleteAccount}
        onClose={closeUserDeleteAccount}
        userId={profile.id}
      />
    </>
  );
}
