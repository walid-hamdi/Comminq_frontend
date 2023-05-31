"use client";
import NextLink from "next/link";
import { useFormik } from "formik";
// import * as Yup from "yup";
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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import GoogleButton from "../../components/GoogleAuthButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: Partial<RegisterFormValues> = {};

      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.confirmPassword) {
        errors.password = "Confirm password is required";
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://comminq-backend.onrender.com/api/user/register",
          {
            name: values.name,
            email: values.email,
            password: values.password,
          }
        );

        const token = response.data.token;

        Cookies.set("comminq_auth_token", token);
        setLoading(false); // End loading state
        router.replace("/");
      } catch (error: any) {
        let errorMessage = "An error occurred during register.";

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
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading textAlign="center" fontSize={"3xl"}>
            📝 Join the Comminq Community
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="name"
                isInvalid={!!formik.errors.name && formik.touched.name}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="email"
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
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
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="confirmPassword"
                isInvalid={
                  !!formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={formik.isSubmitting}
                >
                  Sign up
                </Button>
                <GoogleButton />
              </Stack>
            </Stack>
          </form>
        </Box>

        <Text fontSize={"lg"} color={"gray.600"}>
          Already have an account?{" "}
          <Link href="/login" as={NextLink} color={"blue.400"}>
            Sign in
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
}
