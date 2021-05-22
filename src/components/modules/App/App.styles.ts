import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface IProps {
  isDesktop: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      background: "snow",
      minHeight: "100vh",
    },
    content: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12),
      paddingLeft: (props: IProps) => (props.isDesktop ? theme.spacing(10) : 0),
      paddingRight: (props: IProps) =>
        props.isDesktop ? theme.spacing(10) : 0,
    },
  })
);

export default useStyles;
