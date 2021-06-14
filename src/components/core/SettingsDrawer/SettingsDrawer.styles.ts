import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightDrawer: {
      "& .MuiDrawer-paper": {
        width: "70%",
      },
    },
    userInfo: {
      padding: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto",
    },
  })
);

export default useStyles;
