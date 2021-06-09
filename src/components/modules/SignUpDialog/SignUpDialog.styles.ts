import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      paddingBottom: theme.spacing(3),
    },
    dividerText: {
      textAlign: "center",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      marginTop: theme.spacing(1),
    },
  })
);

export default useStyles;
