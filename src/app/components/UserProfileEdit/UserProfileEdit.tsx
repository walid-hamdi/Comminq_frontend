import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../../entities/profile";
import userService from "../../services/userService";
import { EditFormValues, validateEditForm } from "../../utils/formValidations";

interface UserProfileEditProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const UserProfileEdit = ({
  isOpen,
  onClose,
  profile,
}: UserProfileEditProps) => {
  const toast = useToast();
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePictureRemoved = () => {
    setError(null);
    setLoading(true);
    userService
      .deleteProfilePicture(profile.id)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setProfilePicture(null);
          setSuccess(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = "An error occurred while updating the profile.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }
        setError(errorMessage);
      });
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setProfilePicture(selectedFile);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (profile) {
        formik.setValues({
          name: profile.name,
          email: profile.email,
        });
      }

      if (success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setSuccess(false);
      } else if (error) {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setError("");
      }
    }
  }, [success, error, toast, onClose, isOpen, profile]);

  const handleSubmit = async (
    values: EditFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    console.log(profilePicture, profile.picture);
    if (
      profile.name === values.name.trim() &&
      profile.email === values.email.trim() &&
      profile.picture.url === (profilePicture ? profilePicture.name : null)
    )
      return toast({
        title: "No updated!",
        description: "To update you should make some changes or skip it",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    setError(null);
    setLoading(true);

    userService
      .updateProfile(profile.id, { ...values }, profilePicture)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setSuccess(true);
        } else {
          setError(
            "Failed to update profile. Unexpected status: " + response.status
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = "An error occurred while updating the profile.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }
        setError(errorMessage);
      });
  };

  const formik = useFormik<EditFormValues>({
    initialValues: {
      name: profile.name,
      email: profile.email,
    },
    validate: validateEditForm,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent
          mx={[4, "auto"]}
          my={[4, "auto"]}
          width={["100%", "80%", "60%"]}
        >
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id="picture">
                  <FormLabel>Profile Picture</FormLabel>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={
                          profilePicture
                            ? URL.createObjectURL(profilePicture)
                            : profile.picture?.url
                        }
                      >
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          isLoading={loading}
                          icon={<SmallCloseIcon />}
                          onClick={handlePictureRemoved}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Box>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelected}
                          display="none"
                          id="file-uploader"
                        />
                        <label htmlFor="file-uploader">
                          <Button
                            cursor="pointer"
                            size="sm"
                            as="span"
                            colorScheme="blue"
                            isLoading={loading}
                          >
                            Change profile picture
                          </Button>
                        </label>
                        <Text mt={2} fontSize="sm" color="gray.500">
                          Accepted file types: JPEG, PNG
                        </Text>
                      </Box>
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl
                  id="name"
                  isInvalid={!!formik.errors.name && formik.touched.name}
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
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
                    id="email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                bg={"red.400"}
                color={"white"}
                mr={3}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                type="submit"
                isLoading={loading}
                loadingText="Changing..."
              >
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
function useRef(arg0: null) {
  throw new Error("Function not implemented.");
}
