import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    question: {
      position: "relative",
      overflow: "visible",
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
  })
);

export default useStyles;
