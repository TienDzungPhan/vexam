import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    dialogTitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
);

export default useStyles;
