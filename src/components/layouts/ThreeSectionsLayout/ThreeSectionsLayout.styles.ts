import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface IProps {
  isDesktop: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      width: "100%",
    },
    container: {
      justifyContent: "center",
    },
    leftSide: {
      position: "sticky",
      top: theme.spacing(10),
      left: theme.spacing(15),
    },
    rightSide: {
      position: "sticky",
      top: theme.spacing(10),
      // Use left to deal with hidden right-side scroll
      left: theme.spacing(114),
      width: theme.spacing(32),
      paddingTop: theme.spacing(3),
    },
    main: {
      paddingTop: (props: IProps) => (props.isDesktop ? 0 : theme.spacing(3)),
    },
  })
);

export default useStyles;
