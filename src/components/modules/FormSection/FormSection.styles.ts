import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outsideInput: {
      "& .MuiInputBase-root": {
        background: theme.palette.background.paper,
      },
      marginBottom: theme.spacing(3),
    },
  })
);

export default useStyles;
