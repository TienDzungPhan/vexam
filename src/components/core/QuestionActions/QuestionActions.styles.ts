import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      justifyContent: "space-between",
    },
    flexActions: {
      marginLeft: "auto",
    },
  })
);

export default useStyles;
