import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBar: {
      background: "rgba(255, 255, 255, 0.97)",
      color: theme.palette.primary.main,
    },
    menu: {
      display: "flex",
    },
    user: {
      marginLeft: theme.spacing(3),
    },
    toolbar: {
      justifyContent: "space-between",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    bottomNavBar: {
      top: "auto",
      bottom: 0,
    },
  })
);

export default useStyles;
