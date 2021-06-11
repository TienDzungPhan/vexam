import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
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
