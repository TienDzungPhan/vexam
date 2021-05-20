import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      height: theme.spacing(5),
      width: theme.spacing(50),
    },
  })
);

export default useStyles;
