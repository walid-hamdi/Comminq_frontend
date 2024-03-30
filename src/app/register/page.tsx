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
import * as Sentry from "@sentry/nextjs";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import GoogleButton from "../components/GoogleAuthButton";
import userService from "../services/userService";
import { logResult } from "../utils/debugUtils";
import {
  RegisterFormValues,
  validateRegisterForm,
} from "../utils/formValidations";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (
    values: RegisterFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await userService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      const token = response.data.token;
      logResult(`Response : ${token}`);
      localStorage.setItem("token", token);
      router.replace("/verify-email");
    } catch (error: any) {
      let errorMessage = "An error occurred during register.";
      if (error.response && error.response.data && error.response.data.error)
        errorMessage = error.response.data.error;
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      Sentry.captureException(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateRegisterForm,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"md"} py={12} px={6}>
        <Heading textAlign="center" fontSize={"2xl"}>
          📝 Join the Comminq Community
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
