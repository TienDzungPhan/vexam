import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  Typography,
  ListItem,
} from "@material-ui/core";
import useStyles from "./Performance.styles";

const Performance: React.FC = () => {
  const styles = useStyles();
  return (
    <Card className={styles.performance}>
      <CardHeader title="Performance" />
      <CardContent className={styles.content}>
        <List>
          <ListItem>
            <Typography variant="body2" component="span">
              Attempted
            </Typography>
            <Typography
              variant="h5"
              component="span"
              className={styles.floatRight}
            >
              99
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" component="span">
              Accuracy
            </Typography>
            <Typography
              variant="h5"
              component="span"
              className={styles.floatRight}
            >
              99%
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" component="span">
              Current Streak
            </Typography>
            <Typography
              variant="h5"
              component="span"
              className={styles.floatRight}
            >
              25
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" component="span">
              Longest Streak
            </Typography>
            <Typography
              variant="h5"
              component="span"
              className={styles.floatRight}
            >
              50
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Performance;
