import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    question: {
      position: "relative",
      overflow: "visible",
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
    upperHeader: {
      position: "absolute",
      top: theme.spacing(-3),
      left: theme.spacing(1),
      minWidth: theme.spacing(30),
    },
    upperButton: {
      marginRight: theme.spacing(1),
      width: theme.spacing(16),
    },
    header: {
      paddingBottom: 0,
    },
    description: {
      paddingTop: theme.spacing(1),
    },
    questionContent: {
      paddingBottom: 0,
    },
    options: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    actions: {
      justifyContent: "space-between",
    },
    explanation: {
      marginBottom: theme.spacing(1),
    },
  })
);

export default useStyles;
