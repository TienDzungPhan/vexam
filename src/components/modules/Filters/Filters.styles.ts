import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filters: {
      marginTop: theme.spacing(3),
    },
    formControl: {
      display: "block",
      marginBottom: theme.spacing(3),
    },
  })
);

export default useStyles;
