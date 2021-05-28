import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    commentsWrapper: {
      padding: 0,
    },
    commentsList: {
      paddingTop: 0,
    },
  })
);

export default useStyles;
