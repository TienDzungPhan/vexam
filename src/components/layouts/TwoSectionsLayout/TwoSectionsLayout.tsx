import React from "react";
import { Divider, Grid, Typography } from "@material-ui/core";
import useStyles from "./TwoSectionsLayout.styles";

interface IProps {
  title?: string;
  main: JSX.Element;
  right: JSX.Element;
  nofixed?: boolean;
}

const TwoSectionsLayout: React.FC<IProps> = ({
  title,
  main,
  right,
  nofixed,
}) => {
  const styles = useStyles();
  return (
    <Grid container spacing={nofixed ? 3 : 0}>
      <Grid item md={8} className={styles.main}>
        {title && (
          <div className={styles.title}>
            <Typography variant="h4">{title}</Typography>
            <Divider />
          </div>
        )}
        {main}
      </Grid>
      <Grid item md={4}>
        <div className={nofixed ? "" : styles.rightSide}>{right}</div>
      </Grid>
    </Grid>
  );
};

export default TwoSectionsLayout;
