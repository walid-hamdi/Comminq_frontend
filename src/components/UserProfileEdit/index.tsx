"use client";
import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

interface UserProfileEditProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileEdit = ({ isOpen, onClose }: UserProfileEditProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="userName">
                <FormLabel>Profile Picture</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src="">
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                      />
                    </Avatar>
                  </Center>
                  <Center w="full">
                    <Button w="full">Change Picture</Button>
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="userName" isRequired>
                <FormLabel>User name</FormLabel>
                <Input
                  placeholder="UserName"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="password"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button bg={"red.400"} color={"white"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg={"blue.400"} color={"white"} onClick={onClose}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfileEdit;
