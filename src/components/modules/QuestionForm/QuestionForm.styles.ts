import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      "& .MuiInputBase-root": {
        background: theme.palette.background.paper,
      },
    },
    question: {
      marginTop: theme.spacing(3),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default useStyles;
