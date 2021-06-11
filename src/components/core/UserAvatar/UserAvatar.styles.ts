import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    xlarge: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  })
);

export default useStyles;
