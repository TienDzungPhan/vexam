import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
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
