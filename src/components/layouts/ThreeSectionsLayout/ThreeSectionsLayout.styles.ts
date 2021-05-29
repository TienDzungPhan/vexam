import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: "center",
    },
    leftSide: {
      position: "fixed",
      top: theme.spacing(10),
      left: theme.spacing(15),
    },
    rightSide: {
      position: "fixed",
      top: theme.spacing(10),
      // Use left to deal with hidden right-side scroll
      left: theme.spacing(114),
      width: theme.spacing(32),
    },
  })
);

export default useStyles;
