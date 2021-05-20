import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBar: {
      background: "rgba(255, 255, 255, 0.9)",
      color: theme.palette.primary.main,
    },
    menu: {
      marginLeft: "auto",
    },
    user: {
      marginLeft: theme.spacing(3),
    },
  })
);

export default useStyles;
