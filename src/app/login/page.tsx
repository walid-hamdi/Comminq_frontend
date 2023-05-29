"use client";
import { useFormik } from "formik";
import axios from "axios";
import NextLink from "next/link";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import GoogleButton from "../../components/GoogleButton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<LoginFormValues> = {};

      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://comminq-backend.onrender.com/api/user/login",
          {
            email: values.email,
            password: values.password,
          }
        );

        const token = response.data.token;

        Cookies.set("comminq_auth_token", token);
          setLoading(false); // End loading state
        router.replace("/");
      } catch (error: any) {
        let errorMessage = "An error occurred during login.";

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false); // End loading state
      }
    },
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading textAlign="center" fontSize={"3xl"}>
            🔐 Unlock the Comminq
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form
            method="post" // Specify the method as "post"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              formik.handleSubmit(); // Manually handle form submission
            }}
          >
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
                isInvalid={!!formik.errors.password && formik.touched.password}
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
                  <Link as={NextLink} href="forgotpassword" color={"blue.400"}>
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
                  isLoading={isLoading}
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
  );
}
