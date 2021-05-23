import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./TwoSectionsLayout.styles";

interface IProps {
  main: JSX.Element;
  right: JSX.Element;
}

const TwoSectionsLayout: React.FC<IProps> = ({ main, right }) => {
  const styles = useStyles();
  return (
    <Grid container spacing={0}>
      <Grid item md={8}>
        {main}
      </Grid>
      <Grid item md={4}>
        <div className={styles.rightSide}>{right}</div>
      </Grid>
    </Grid>
  );
};

export default TwoSectionsLayout;
