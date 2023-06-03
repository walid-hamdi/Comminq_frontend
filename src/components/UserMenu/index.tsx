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
} from "@chakra-ui/react";
import { FiUser, FiLogOut, FiMoreHorizontal, FiEdit } from "react-icons/fi";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import UserProfile from "../UserProfile";
import useProfile from "@/hooks/useProfile";
import UserProfileEdit from "../UserProfileEdit";
import { CanceledError } from "axios";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, error, isLoading } = useProfile();
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
      // try {
      //   await logout();
      //   router.replace("/login");
      // } catch (error: any) {
      //   let errorMessage = "An error occurred during logout.";
      //   if (error instanceof CanceledError) return;
      //   if (
      //     error.response &&
      //     error.response.data &&
      //     error.response.data.error
      //   ) {
      //     errorMessage = error.response.data.error;
      //   }
      //   toast({
      //     title: "Error",
      //     description: errorMessage,
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // }

      googleLogout();
    }
    if (item === "Profile") openUserProfile();

    if (item === "Edit") openUserProfileEdit();
  };

  const { name, picture } = profile || {};

  return (
    <>
      <Menu placement="top" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton
          zIndex="100"
          mb="5"
          pos="absolute"
          bottom="0"
          left="0"
          right="0"
          as={Button}
          variant="unstyled"
          onClick={handleMenuClick}
          transition="background-color 0.2s"
          _hover={{
            bg: "rgba(16, 12, 12, 0.54)",
          }}
          px="4"
        >
          <Flex align="center" justifyContent="center" borderRadius="md">
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <Avatar size="sm" name={name} src={picture}>
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
                <Text fontSize="sm" ml="3">
                  {name}
                </Text>
                <Spacer />
                <Box as={FiMoreHorizontal} size="20px" color="gray.500" />
              </>
            )}
          </Flex>
        </MenuButton>
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
