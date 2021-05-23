import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    performance: {
      marginTop: theme.spacing(3),
    },
    content: {
      paddingTop: 0,
    },
    floatRight: {
      marginLeft: "auto",
    },
  })
);

export default useStyles;
