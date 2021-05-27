import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentInput: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      background: theme.palette.background.paper,
    },
  })
);

export default useStyles;
