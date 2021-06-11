import React, { useContext, useMemo, useState } from "react";
import {
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@material-ui/core";
import { DialogContext } from "@Contexts/DialogContext";
import { inputValidation, passwordConfirmation } from "@Helpers/validation";
import { signUpWithEmailAndPassword } from "@Config/auth";
import { addNewUserData } from "@Services/User";
import useStyles from "./SignUpDialog.styles";

const SignUpDialog: React.FC = () => {
  const styles = useStyles();
  const { handleDialogOpen, handleDialogClose } = useContext(DialogContext);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const nameValidation = useMemo(() => inputValidation(name), [name]);
  const emailValidation = useMemo(() => inputValidation(email), [email]);
  const passwordValidation = useMemo(
    () => inputValidation(password),
    [password]
  );
  const passwordConfirmStatus = useMemo(
    () => passwordConfirmation(password, passwordConfirm),
    [password, passwordConfirm]
  );
  const formValidated = useMemo(
    () =>
      nameValidation.validated &&
      emailValidation.validated &&
      passwordValidation.validated &&
      passwordConfirmStatus.validated,
    [nameValidation, emailValidation, passwordValidation, passwordConfirmStatus]
  );
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };
  const handleSignUp = async () => {
    if (!submitAttempted) setSubmitAttempted(true);
    if (formValidated) {
      try {
        const cred = await signUpWithEmailAndPassword(email, password);
        await addNewUserData(cred.user?.uid || "", { name, email });
        handleDialogClose();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };
  return (
    <DialogContent className={styles.dialogContent}>
      <DialogContentText>
        By continuing, you agree to our User Terms and Privacy Policies
      </DialogContentText>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        size="large"
        className={styles.button}
        startIcon={<i className="fab fa-google" />}
      >
        Log In with Google
      </Button>
      <Typography variant="h5" className={styles.dividerText}>
        OR
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        id="name"
        className={styles.textField}
        type="text"
        label="Name"
        placeholder="Enter your display name"
        value={name}
        onChange={handleNameChange}
        error={submitAttempted && !nameValidation.validated}
        helperText={submitAttempted && nameValidation.error}
        required
      />
      <TextField
        fullWidth
        variant="outlined"
        id="email"
        className={styles.textField}
        type="text"
        label="Email"
        placeholder="Enter your email address"
        value={email}
        onChange={handleEmailChange}
        error={submitAttempted && !emailValidation.validated}
        helperText={submitAttempted && emailValidation.error}
        required
      />
      <TextField
        fullWidth
        variant="outlined"
        id="password"
        className={styles.textField}
        type="password"
        label="Password"
        placeholder="Choose your password"
        value={password}
        onChange={handlePasswordChange}
        error={submitAttempted && !passwordValidation.validated}
        helperText={submitAttempted && passwordValidation.error}
        required
      />
      <TextField
        fullWidth
        variant="outlined"
        id="password-confirm"
        className={styles.textField}
        type="password"
        label="Password Confirm"
        placeholder="Confirm your password"
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
        error={!passwordConfirmStatus.validated}
        helperText={passwordConfirmStatus.error}
        required
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={styles.button}
        disabled={submitAttempted && !formValidated}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
      <Button
        fullWidth
        variant="text"
        color="primary"
        className={styles.button}
        onClick={handleDialogOpen("log-in")}
      >
        Already have an account? Log In!
      </Button>
    </DialogContent>
  );
};

export default SignUpDialog;
