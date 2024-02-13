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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import GoogleButton from "../components/GoogleAuthButton";
import userService from "../services/userService";
import { LoginFormValues, validateLoginForm } from "../utils/formValidations";
import { logResult } from "../utils/debugUtils";
import ForgotPassword from "../components/forgot-password";

export default function Login() {
  const router = useRouter();
  const toast = useToast();

  const {
    isOpen: isForgotPasswordOpen,
    onOpen: openForgotPassword,
    onClose: closeForgotPassword,
  } = useDisclosure();

  const handleSubmit = async (
    values: LoginFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await userService.login({
        email: values.email,
        password: values.password,
      });

      const token = response.data.token;
      logResult(`Response : ${token}`);
      localStorage.setItem("token", token);
      router.replace("/verify-email");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setSubmitting(false);
    }
  };

  // handleError
  const handleLoginError = (error: any) => {
    logResult(`Error ${error}`);
    let errorMessage = "An error occurred during login.";
    if (error) errorMessage = error;

    if (error.response && error.response.data && error.response.data.error)
      errorMessage = error.response.data.error;

    toast({
      title: "Error",
      description: errorMessage,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLoginForm,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

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
            🔐 Unlock the Comminq
          </Heading>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
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
                <FormControl
                  id="password"
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link
                      // as={NextLink}
                      onClick={() => openForgotPassword()}
                      color={"blue.400"}
                      cursor={"pointer"}
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isLoading={formik.isSubmitting}
                  >
                    Sign in
                  </Button>
                  <GoogleButton />
                </Stack>
              </Stack>
            </form>
          </Box>

          <Text fontSize={"lg"} color={"gray.600"}>
            New to Comminq{" "}
            <Link as={NextLink} href="/register" color={"blue.400"}>
              Join now
            </Link>
          </Text>
        </Stack>
      </Flex>
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={closeForgotPassword}
      />
    </>
  );
}
