import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    content: {
      display: "block",
    },
    reply: {
      paddingLeft: theme.spacing(6),
    },
    showReplyButton: {
      justifyContent: "flex-start",
    },
  })
);

export default useStyles;
