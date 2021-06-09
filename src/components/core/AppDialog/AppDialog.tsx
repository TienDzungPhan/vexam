import React, { useContext, useMemo } from "react";
import { DialogContext } from "@Contexts/DialogContext";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LogInDialog from "@Modules/LogInDialog";
import SignUpDialog from "@Modules/SignUpDialog";
import useStyles from "./AppDialog.styles";

const AppDialog: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dialogOpened, dialogType, handleDialogClose } =
    useContext(DialogContext);
  const dialogTitle = useMemo(() => {
    switch (dialogType) {
      case "log-in":
        return "Log In";
      case "sign-up":
        return "Sign Up";
      default:
        return "Log In";
    }
  }, [dialogType]);
  const dialogContent = useMemo(() => {
    switch (dialogType) {
      case "log-in":
        return <LogInDialog />;
      case "sign-up":
        return <SignUpDialog />;
      default:
        return <LogInDialog />;
    }
  }, [dialogType]);
  return (
    <Dialog
      fullScreen={isMobile}
      open={dialogOpened}
      onClose={handleDialogClose}
      aria-labelledby={`${dialogType}-dialog`}
    >
      <DialogTitle disableTypography className={styles.dialogTitle}>
        <Typography variant="h5">{dialogTitle}</Typography>
        <IconButton aria-label="close" onClick={handleDialogClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {dialogContent}
    </Dialog>
  );
};

export default AppDialog;
