import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(3),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    error: {
      color: theme.palette.error.main,
    },
  })
);

export default useStyles;
