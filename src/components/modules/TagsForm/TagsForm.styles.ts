import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagsForm: {
      marginTop: theme.spacing(3),
    },
    newTag: {
      marginTop: theme.spacing(2),
    },
  })
);

export default useStyles;
