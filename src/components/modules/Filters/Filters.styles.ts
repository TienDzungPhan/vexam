import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filters: {
      padding: theme.spacing(2),
    },
    formControl: {
      display: "block",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  })
);

export default useStyles;
