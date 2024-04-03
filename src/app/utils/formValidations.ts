export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormValues {
  email: string;
  code: string;
  newPassword: string;
}

export interface EditFormValues {
  name: string;
  email: string;
}

export const validateLoginForm = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues) => {
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
    errors.confirmPassword = "Confirm password is required";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return errors;
};

export const validateChangePasswordForm = (
  values: ChangePasswordFormValues,
  googleLogin: boolean
) => {
  const errors: Partial<ChangePasswordFormValues> = {};

  if (!googleLogin)
    if (!values.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  }

  if (values.newPassword.length < 6) {
    errors.newPassword = "New password should be at least 6+ characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  }

  return errors;
};

export const validateForgotPasswordForm = (
  values: ForgotPasswordFormValues,
  showCodeField: boolean,
  showPasswordField: boolean
) => {
  const errors: Partial<ForgotPasswordFormValues> = {};

  if (!showCodeField && !showPasswordField)
    if (!values.email) {
      errors.email = "Email is required";
    }

  if (showCodeField)
    if (!values.code) {
      errors.code = "Verification code is required";
    }

  if (showPasswordField)
    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    }

  return errors;
};

export const validateEditForm = (values: EditFormValues) => {
  const errors: Partial<EditFormValues> = {};

  if (!values.name) errors.name = "Name is required";
  if (!values.email) errors.email = "Email is required";

  return errors;
};
