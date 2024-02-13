"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import useForgotPassword from "../../hooks/useForgotPassword";

type ForgotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ForgotPassword({
  isOpen,
  onClose,
}: ForgotPasswordProps) {
  const toast = useToast();

  const { forgotPassword, verifyCode, resetPassword, loading, success, error } =
    useForgotPassword();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendClick = () => {
    forgotPassword(email);
  };

  const handleVerifyClick = () => {
    verifyCode(email, verificationCode);
  };

  const handleResetPasswordClick = () => {
    resetPassword(verificationCode, newPassword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="5"></ModalBody>
      </ModalContent>
    </Modal>
  );
}
