"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";
import {
  ForgotPasswordFormValues,
  validateForgotPasswordForm,
} from "../utils/formValidations";
import userService from "../services/userService";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const toast = useToast();
  const [showCodeField, setShowCodeField] = useState<boolean>(false);
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
      });
    }
  }, [error]);

  const handleSubmit = (
    values: ForgotPasswordFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setLoading(true);
    setError(null);
    if (!showCodeField) {
      userService
        .forgotPassword(values.email)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            setShowCodeField(true);
          }
        })
        .catch((error: any) => {
          setLoading(false);
          let errorMessage =
            "Failed to send the verification code. Please try again.";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          )
            errorMessage = error.response.data.error;

          setError(errorMessage);
        });
    } else if (!showPasswordField) {
      userService
        .verifyCode(values.email, values.code.toString())
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            setShowPasswordField(true);
          }
        })
        .catch((error: any) => {
          setLoading(false);
          let errorMessage = "Invalid verification code. Please try again.";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          )
            errorMessage = error.response.data.error;

          setError(errorMessage);
        });
    } else {
      userService
        .changePasswordByCode(values.code.toString(), values.newPassword)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            setShowCodeField(false);
            setShowPasswordField(false);
            router.replace("/login");
          }
        })
        .catch((error: any) => {
          setLoading(false);
          let errorMessage = "Failed to reset the password. Please try again.";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          )
            errorMessage = error.response.data.error;

          setError(errorMessage);
        });
    }
  };

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
      code: "",
      newPassword: "",
    },
    validate: (values) =>
      validateForgotPasswordForm(values, showCodeField, showPasswordField),
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  const showField = () => {
    if (!showCodeField) {
      return (
        <FormControl
          id="email"
          isInvalid={!!formik.errors.email && formik.touched.email}
        >
          <FormLabel>Email address</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
      );
    }

    if (showCodeField && !showPasswordField) {
      return (
        <FormControl
          id="code"
          isInvalid={!!formik.errors.code && formik.touched.email}
        >
          <FormLabel>Verification Code</FormLabel>
          <Input
            id="code"
            type="number"
            name="code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          <FormErrorMessage>{formik.errors.code}</FormErrorMessage>
        </FormControl>
      );
    }
    if (showPasswordField) {
      return (
        <FormControl
          id="newPassword"
          isInvalid={!!formik.errors.newPassword && formik.touched.newPassword}
        >
          <FormLabel>New Password</FormLabel>
          <Input
            id="newPassword"
            type="password"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
        </FormControl>
      );
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"md"} py={12} px={6}>
          <Heading textAlign="center" fontSize={"2xl"}>
            🔒 Reset Password
          </Heading>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                {showField()}
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={loading}
                >
                  {!showCodeField
                    ? "Send Verification Code"
                    : !showPasswordField
                    ? "Validate Code"
                    : "Change Password"}
                </Button>
              </Stack>
            </form>
          </Box>

          <Text fontSize={"lg"} color={"gray.600"}>
            Back to{" "}
            <Link as={NextLink} href="/login" color={"blue.400"}>
              Login
            </Link>
          </Text>
        </Stack>
      </Flex>
    </>
  );
}
