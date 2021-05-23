import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./ThreeSectionsLayout.styles";

interface IProps {
  left: JSX.Element;
  main: JSX.Element;
  right: JSX.Element;
}

const ThreeSectionsLayout: React.FC<IProps> = ({ left, main, right }) => {
  const styles = useStyles();
  return (
    <Grid container spacing={0}>
      <Grid item md={4}>
        <div className={styles.leftSide}>{left}</div>
      </Grid>
      <Grid item md={4}>
        {main}
      </Grid>
      <Grid item md={4}>
        <div className={styles.rightSide}>{right}</div>
      </Grid>
    </Grid>
  );
};

export default ThreeSectionsLayout;
