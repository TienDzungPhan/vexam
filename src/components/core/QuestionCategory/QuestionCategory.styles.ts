import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface IProps {
  isDetailedVariant: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    categorySection: {
      position: "absolute",
      top: theme.spacing(-3),
      left: theme.spacing(1),
      minWidth: theme.spacing(30),
    },
    upperButton: {
      marginRight: theme.spacing(1),
      width: (props: IProps) =>
        props.isDetailedVariant ? "auto" : theme.spacing(16),
    },
  })
);

export default useStyles;
