import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingBottom: 0,
      "& .MuiCardHeader-action": {
        alignSelf: "center",
      },
    },
    description: {
      paddingTop: theme.spacing(1),
    },
  })
);

export default useStyles;
