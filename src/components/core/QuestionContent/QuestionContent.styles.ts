import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    questionCard: {
      marginBottom: theme.spacing(2),
    },
    questionContent: {
      paddingBottom: 0,
    },
    options: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    explanation: {
      marginBottom: theme.spacing(1),
    },
  })
);

export default useStyles;
