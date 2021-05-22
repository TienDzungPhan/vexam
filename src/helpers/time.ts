export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

type TTimeString = (date: Date) => string;
type TDaysLeft = (date: Date) => number;

export const timePast: TTimeString = (origin: Date) => {
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

export const daysLeft: TDaysLeft = (event: Date) => {
  const now = new Date();
  const timeDiff = event.getTime() - now.getTime();

  return Math.floor(timeDiff / DAY);
};
