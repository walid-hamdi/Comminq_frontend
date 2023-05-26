"use client";

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
} from "@chakra-ui/react";
import GoogleButton from "../../components/GoogleButton";

export default function Register() {
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
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="confirmPassword">
              {" "}
              {/* Added confirm password */}
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
              <GoogleButton />
            </Stack>
          </Stack>
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
