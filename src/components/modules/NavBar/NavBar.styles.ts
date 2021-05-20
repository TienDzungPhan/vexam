import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBar: {
      background: "rgba(255, 255, 255, 0.9)",
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
  })
);

export default useStyles;
