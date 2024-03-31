import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Profile } from "../../entities/profile";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

const UserProfile = ({ isOpen, onClose, profile }: UserProfileProps) => {
  const renderContent = () => {
    if (!profile) {
      return (
        <Flex justify="center" align="center">
          <Alert status="info" variant="left-accent">
            <AlertIcon />
            Loading user profile...
          </Alert>
        </Flex>
      );
    }

    const { name, email, picture } = profile;

    return (
      <Box
        mb={4}
        w={"full"}
        // bg={"white"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"}>
          <Avatar
            size={"xl"}
            src={picture}
            name={name}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
            <Text color={"gray.500"}>{email}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={[4, "auto"]} my={[4, 0]} maxWidth={["auto", "80%"]}>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderContent()}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
