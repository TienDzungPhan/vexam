import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    option: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& label": {
        width: "100%",
      },
    },
    correct: {
      color: theme.palette.success.main,
      fontWeight: "bold",
      "& .Mui-disabled": {
        color: theme.palette.success.main,
        fontWeight: "bold",
      },
    },
    incorrect: {
      color: theme.palette.error.main,
      fontStyle: "italic",
      "& .Mui-disabled": {
        color: theme.palette.error.main,
        fontStyle: "italic",
        textDecoration: "line-through",
      },
    },
  })
);

export default useStyles;
