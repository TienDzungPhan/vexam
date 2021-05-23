import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
  })
);

export default useStyles;
