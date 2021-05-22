import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftSide: {
      position: "fixed",
      top: theme.spacing(15),
      left: theme.spacing(15),
    },
    rightSide: {
      position: "fixed",
      top: theme.spacing(15),
      right: theme.spacing(15),
    },
  })
);

export default useStyles;
