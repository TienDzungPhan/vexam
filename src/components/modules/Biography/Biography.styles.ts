import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    floatRight: {
      marginLeft: "auto",
    },
  })
);

export default useStyles;
