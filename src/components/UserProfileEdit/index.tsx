import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Avatar,
  AvatarBadge,
  IconButton,
  Input,
} from "@chakra-ui/react";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { SmallCloseIcon } from "@chakra-ui/icons";
import FileUploader from "../FileUploader";
import { logResult } from "@/utils/debugUtils";

interface UserProfileEditProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialProfile: Profile;
}

interface Profile {
  id: string;
  name: string;
  picture: string;
  email: string;
  password: string;
}

const UserProfileEdit = ({
  isOpen,
  onClose,
  initialProfile: profile,
}: UserProfileEditProps) => {
  const toast = useToast();
  const {
    loading: updateLoading,
    success,
    error,
    updateProfile,
  } = useUpdateProfile();

  const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setUpdatedProfile(profile);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    const isProfileUnchanged =
      updatedProfile.name === profile.name &&
      updatedProfile.email === profile.email &&
      updatedProfile.password === profile.password &&
      profilePicture === null;

    if (isProfileUnchanged) {
      toast({
        title: "No changes made",
        description: "There are no changes to the profile.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      updateProfile(profile.id, updatedProfile, profilePicture);
    }
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // refetchProfile();
      onClose();
    } else if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [success, error, toast, onClose]);

  const handleFileSelect = (file: File) => {
    setProfilePicture(file);
    // Update the local state of the profile picture
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      picture: URL.createObjectURL(file), // Store the local file URL
    }));
  };

  const handleRemovePicture = () => {
    // setProfilePicture(null);
    // // Reset the local state of the profile picture
    // setUpdatedProfile((prevProfile) => ({
    //   ...prevProfile,
    //   picture: "", // Set picture to empty string or the initial profile picture URL
    // }));
  };

  return (
    <>
      {logResult(`profile for edit ${profile}`)}
      {console.log(`profile for edit ${profile}`)}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Profile Picture</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src={updatedProfile.picture}>
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                        onClick={handleRemovePicture} // Add this line
                      />
                    </Avatar>
                  </Center>
                  <Center w="full">
                    <FileUploader onFileSelect={handleFileSelect} />
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  value={updatedProfile.name}
                  onChange={handleInputChange}
                  name="name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="your-email@example.com"
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                  name="email"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button bg={"red.400"} color={"white"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              isLoading={updateLoading}
              disabled={updateLoading}
              onClick={handleUpdateProfile}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfileEdit;
