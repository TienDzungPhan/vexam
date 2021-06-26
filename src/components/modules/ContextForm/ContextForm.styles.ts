import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(3),
    },
    text: {
      marginBottom: theme.spacing(2),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default useStyles;
