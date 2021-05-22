import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { daysLeft } from "@Helpers/time";

const sampleDate = new Date("December 7, 2021");

const CountDown: React.FC = () => {
  const remainingTime = daysLeft(sampleDate);
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <EventIcon />
          </IconButton>
        }
        title="JLPT N5"
        subheader={sampleDate.toLocaleString()}
      />
      <CardContent>
        {remainingTime < 1 ? (
          <Typography variant="h3" component="span">
            Today!
          </Typography>
        ) : (
          <>
            <Typography variant="h3" component="span">
              {remainingTime}
            </Typography>
            &nbsp;
            <Typography variant="h5" component="span">
              days left
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CountDown;
