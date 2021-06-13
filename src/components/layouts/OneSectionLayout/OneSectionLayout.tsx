import React from "react";
import { Divider, Typography } from "@material-ui/core";
import useStyles from "./OneSectionLayout.styles";

interface IProps {
  title?: string;
  main: JSX.Element;
}

const OneSectionLayout: React.FC<IProps> = ({ title, main }) => {
  const styles = useStyles();
  return (
    <>
      {title && (
        <div className={styles.title}>
          <Typography variant="h4">{title}</Typography>
          <Divider />
        </div>
      )}
      {main}
    </>
  );
};

export default OneSectionLayout;
