import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    legend: {
      marginBottom: theme.spacing(2),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(1),
    },
  })
);

export default useStyles;
