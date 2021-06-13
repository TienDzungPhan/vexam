import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    headline: {
      "& .MuiCardHeader-action": {
        alignSelf: "center",
      },
    },
  })
);

export default useStyles;
