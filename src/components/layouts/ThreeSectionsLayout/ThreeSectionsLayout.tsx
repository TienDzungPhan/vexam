import React from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./ThreeSectionsLayout.styles";

interface IProps {
  left: JSX.Element;
  main: JSX.Element;
  right: JSX.Element;
}

const ThreeSectionsLayout: React.FC<IProps> = ({ left, main, right }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const styles = useStyles({ isDesktop });
  return (
    <Grid container spacing={0} className={styles.container}>
      {isDesktop && (
        <Grid item md={4}>
          <div className={styles.leftSide}>{left}</div>
        </Grid>
      )}
      <Grid item md={4}>
        <div className={styles.main}>{main}</div>
      </Grid>
      {isDesktop && (
        <Grid item md={4}>
          <div className={styles.rightSide}>{right}</div>
        </Grid>
      )}
    </Grid>
  );
};

export default ThreeSectionsLayout;
