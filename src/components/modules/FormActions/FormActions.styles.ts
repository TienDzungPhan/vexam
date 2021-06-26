import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkbox: {
      marginTop: theme.spacing(2),
    },
    actions: {
      justifyContent: "flex-end",
    },
  })
);

export default useStyles;
