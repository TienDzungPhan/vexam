import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filtersAppBar: {
      top: theme.spacing(7),
      zIndex: 3,
    },
    toolBar: {
      justifyContent: "space-between",
    },
    leftDrawer: {
      "& .MuiDrawer-paper": {
        width: "70%",
      },
    },
  })
);

export default useStyles;
