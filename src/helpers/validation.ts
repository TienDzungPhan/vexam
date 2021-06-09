interface IValidation {
  validated: boolean;
  error: string | null;
}

export const inputValidation = (input: string): IValidation => {
  const validation: IValidation = {
    validated: true,
    error: null,
  };
  if (input === "") {
    validation.validated = false;
    validation.error = "This field is required!";
  }
  return validation;
};

export const passwordConfirmation = (
  password: string,
  passwordConfirm: string
): IValidation => {
  const validation: IValidation = {
    validated: true,
    error: null,
  };
  if (passwordConfirm !== password) {
    validation.validated = false;
    validation.error = "Password did not match!";
  }
  return validation;
};
