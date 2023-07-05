import { useState, useEffect } from "react";
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
import useForgotPassword from "@/hooks/useForgotPassword";

type ForgotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ForgotPassword({
  isOpen,
  onClose,
}: ForgotPasswordProps): JSX.Element {
  const toast = useToast();

  const { forgotPassword, verifyCode, resetPassword, loading, success, error } =
    useForgotPassword();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"email" | "verification" | "newPassword">(
    "email"
  );

  useEffect(() => {
    if (success) {
      if (step === "email") {
        toast({
          title: "Email Sent",
          description: "Your verification code has been sent successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setStep("verification");
      } else if (step === "verification") {
        toast({
          title: "Valid verification code",
          description:
            "Your verification code has been submitted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setStep("newPassword");
      } else if (step === "newPassword") {
        toast({
          title: "Changed Password",
          description: "Your password has been changed successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    } else if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [success, error, step, toast, onClose]);

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
        <ModalBody pb="5">
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {step === "email" && "You'll get an email with a verification code"}
            {step === "verification" && "Enter the verification code"}
            {step === "newPassword" && "Enter your new password"}
          </Text>
          {step === "email" && (
            <FormControl id="email">
              <Box py={4}>
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </FormControl>
          )}
          {step === "verification" && (
            <FormControl id="verificationCode">
              <Box py={4}>
                <Input
                  placeholder="Verification Code"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Box>
            </FormControl>
          )}
          {step === "newPassword" && (
            <FormControl id="newPassword">
              <Box py={4}>
                <Input
                  placeholder="New Password"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Box>
            </FormControl>
          )}
          <Stack spacing={6}>
            {step === "email" && (
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSendClick}
                isLoading={loading}
                loadingText="Sending"
              >
                Send
              </Button>
            )}
            {step === "verification" && (
              <>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleVerifyClick}
                  isLoading={loading}
                  loadingText="Verifying"
                >
                  Verify
                </Button>
                <Button variant="link" onClick={() => setStep("email")}>
                  Go Back
                </Button>
              </>
            )}
            {step === "newPassword" && (
              <>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleResetPasswordClick}
                  isLoading={loading}
                  loadingText="Resetting"
                >
                  Reset Password
                </Button>
                <Button variant="link" onClick={() => setStep("verification")}>
                  Go Back
                </Button>
              </>
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
