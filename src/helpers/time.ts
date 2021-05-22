const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

type TTimeString = (origin: Date) => string;

// eslint-disable-next-line import/prefer-default-export
export const timeString: TTimeString = (origin: Date) => {
  const now = new Date();
  const timeDiff = now.getTime() - origin.getTime();

  if (timeDiff < MINUTE) return "Just Now";
  if (timeDiff < HOUR && timeDiff >= MINUTE)
    return `${Math.floor(timeDiff / MINUTE)} min`;
  if (timeDiff < DAY && timeDiff >= HOUR)
    return `${Math.floor(timeDiff / HOUR)} hr`;
  if (timeDiff < WEEK && timeDiff >= DAY)
    return `${Math.floor(timeDiff / DAY)} days`;

  return origin.toLocaleString();
};
