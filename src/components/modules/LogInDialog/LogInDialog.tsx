import React, { useContext, useMemo, useState } from "react";
import {
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@material-ui/core";
import { DialogContext } from "@Contexts/DialogContext";
import { inputValidation } from "@Helpers/validation";
import { logInWithEmailAndPassword } from "@Config/auth";
import useStyles from "./LogInDialog.styles";

const LogInDialog: React.FC = () => {
  const styles = useStyles();
  const { handleDialogOpen, handleDialogClose } = useContext(DialogContext);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailValidation = useMemo(() => inputValidation(email), [email]);
  const passwordValidation = useMemo(
    () => inputValidation(password),
    [password]
  );
  const formValidated = useMemo(
    () => emailValidation.validated && passwordValidation.validated,
    [emailValidation, passwordValidation]
  );
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogIn = async () => {
    if (!submitAttempted) setSubmitAttempted(true);
    if (formValidated) {
      try {
        await logInWithEmailAndPassword(email, password);
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
        id="email"
        className={styles.textField}
        type="text"
        label="Email"
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
        value={password}
        onChange={handlePasswordChange}
        error={submitAttempted && !passwordValidation.validated}
        helperText={submitAttempted && passwordValidation.error}
        required
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={styles.button}
        disabled={submitAttempted && !formValidated}
        onClick={handleLogIn}
      >
        Log In
      </Button>
      <Button
        fullWidth
        variant="text"
        color="primary"
        className={styles.button}
        onClick={handleDialogOpen("sign-up")}
      >
        Don&apos;t have an account? Sign Up now!
      </Button>
    </DialogContent>
  );
};

export default LogInDialog;
