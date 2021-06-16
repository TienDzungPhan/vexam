import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    replies: {
      paddingLeft: theme.spacing(6),
    },
  })
);

export default useStyles;
