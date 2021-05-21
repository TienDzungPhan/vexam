import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      background: "snow",
      minHeight: "100vh",
    },
    content: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  })
);

export default useStyles;
