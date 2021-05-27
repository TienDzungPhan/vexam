import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    answersCountAndActions: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default useStyles;
