import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
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
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (profile) {
        formik.setValues({
          name: profile.name,
          email: profile.email,
          password: "",
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
      } else if (error) {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [success, error, toast, onClose, isOpen, profile]);

  const handleSubmit = async (
    values: EditFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (
      profile.name === values.name.trim() &&
      profile.email === values.email.trim()
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
      password: "",
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
        <ModalContent mx={[4, "auto"]} my={[4, 0]} maxWidth={["auto", "80%"]}>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <Stack spacing={4}>
                {/* <FormControl id="picture"> */}
                {/* <FormLabel>Profile Picture</FormLabel> */}
                {/* <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={updatedProfile.picture}
                      >
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                          onClick={handleRemovePicture}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <FileUploader onFileSelect={handleFileSelect} />
                    </Center>
                  </Stack> */}
                {/* </FormControl> */}
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
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (
                        validateEditForm({
                          ...formik.values,
                          email: e.target.value,
                        }).email === null
                      ) {
                        setShowPassword(true);
                      } else {
                        setShowPassword(false);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                {showPassword && (
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
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
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
