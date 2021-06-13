import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import { IUser } from "@Models/User";
import useStyles from "./Biography.styles";

interface IProps {
  userData: IUser | null;
}

const Biography: React.FC<IProps> = ({ userData }) => {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader title="About Me" />
      <CardContent className={styles.content}>
        {userData?.about && (
          <Typography variant="body2" color="textSecondary" component="p">
            {userData.about}
          </Typography>
        )}
      </CardContent>
      {userData?.studyingExams && (
        <List
          aria-labelledby="studying-subheader"
          subheader={
            <ListSubheader component="div" id="studying-subheader">
              Studying
            </ListSubheader>
          }
        >
          {userData.studyingExams.map((exam) => (
            <ListItem key={exam.id} button>
              <ListItemText primary={exam.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default Biography;
