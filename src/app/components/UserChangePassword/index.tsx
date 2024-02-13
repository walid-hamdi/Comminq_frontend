import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useChangePassword from "../../hooks/useChangePassword";

interface UserChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const UserChangePassword = ({
  isOpen,
  onClose,
  userId,
}: UserChangePasswordProps) => {
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, success, error, changePassword } = useChangePassword();

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Change Failed",
        description: "New password and confirm password do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    changePassword(userId, currentPassword, newPassword);
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  const handleFormReset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleFormReset} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"red.400"}
              color={"white"}
              mr={3}
              onClick={handleFormReset}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={handlePasswordChange}
              isLoading={loading}
              disabled={loading}
              loadingText="Changing"
            >
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserChangePassword;
