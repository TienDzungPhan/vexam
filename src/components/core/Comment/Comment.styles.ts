import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    avatarWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    content: {
      display: "block",
    },
    showReplyButton: {
      justifyContent: "flex-start",
    },
  })
);

export default useStyles;
