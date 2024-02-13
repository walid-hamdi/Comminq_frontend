import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import useDeleteAccount from "../../hooks/useDeleteAccount";

interface UserDeleteAccountProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string; // Assuming you have a prop for the user ID
}

const UserDeleteAccount = ({
  isOpen,
  onClose,
  userId,
}: UserDeleteAccountProps) => {
  const toast = useToast();
  const router = useRouter();

  const { loading, success, error, deleteAccount } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount(userId);
  };

  // Handle success or error messages
  useEffect(() => {
    if (success) {
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.removeItem("token");
      router.replace("/login");
      googleLogout();

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
  }, [success, error, onClose, toast, router]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>
                  Are you sure you want to delete your account?
                </FormLabel>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"blue.400"}
              color={"white"}
              mr={3}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              bg={"red.400"}
              color={"white"}
              onClick={handleDeleteAccount}
              isLoading={loading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserDeleteAccount;
