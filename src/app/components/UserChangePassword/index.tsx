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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../../entities/profile";
import userService from "../../services/userService";
import {
  ChangePasswordFormValues,
  validateChangePasswordForm,
} from "../../utils/formValidations";

interface UserChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

const UserChangePassword = ({
  isOpen,
  onClose,
  profile,
}: UserChangePasswordProps) => {
  const toast = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      toast({
        title: "Password changed error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  const handleSubmit = (
    values: ChangePasswordFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (values.newPassword !== values.confirmPassword) {
      toast({
        title: "New password match",
        description: "New password and confirm password do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setLoading(true);
      setError(null);
      userService
        .changePassword(profile.id, values.currentPassword, values.newPassword)
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            toast({
              title: "Password Changed",
              description: "Your password has been changed successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            formik.resetForm();
            onClose();
            return router.replace("/login");
          } else {
            setError(
              "Failed to change password. Unexpected status: " + response.status
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          let errorMessage = "An error occurred while changing the password.";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMessage = error.response.data.error;
          }
          setError(errorMessage);
        });
    }
  };

  const formik = useFormik<ChangePasswordFormValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) =>
      validateChangePasswordForm(values, profile.googleLogin),
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  const handleFormReset = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleFormReset} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <Stack spacing={4}>
                {!profile.googleLogin && (
                  <FormControl
                    id="currentPassword"
                    isInvalid={
                      !!formik.errors.currentPassword &&
                      formik.touched.currentPassword
                    }
                  >
                    <FormLabel>Current Password</FormLabel>
                    <Input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.currentPassword}
                    />
                    <FormErrorMessage>
                      {formik.errors.currentPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
                <FormControl
                  id="newPassword"
                  isInvalid={
                    !!formik.errors.newPassword && formik.touched.newPassword
                  }
                >
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                  />
                  <FormErrorMessage>
                    {formik.errors.newPassword}
                  </FormErrorMessage>
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
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                bg={"red.400"}
                color={"white"}
                mr={3}
                onClick={handleFormReset}
                disabled={loading}
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
                Change Password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserChangePassword;
