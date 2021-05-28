import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(2),
    },
    main: {
      width: "100%",
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
