"use client";
import Sidebar from "@/components/Sidebar";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FcAssistant } from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function Home() {
  return (
    <Sidebar>
      <Box py={4}>
        <Stack spacing={4} as={Container} maxW={"4xl"} textAlign={"center"}>
          <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
            Comminq Community 🚀
          </Heading>
          <Text color={"gray.600"} fontSize={{ base: "lg", sm: "xl" }}>
            🎉 Join the revolution of boundless possibilities! 💫
          </Text>
        </Stack>
        <Container maxW={"10xl"} mt={10}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={3}
            justifyItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            {Array(20)
              .fill(0, 1, 20)
              .map((_, index) => (
                <Card
                  key={index}
                  heading={"Heading"}
                  icon={<Icon as={FcAssistant} w={10} h={10} />}
                  description={
                    "Lorem ipsum dolor sit amet catetur, adipisicing elit."
                  }
                  href={"#"}
                />
              ))}
          </Grid>
        </Container>
      </Box>
    </Sidebar>
  );
}
