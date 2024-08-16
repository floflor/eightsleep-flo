import dayjs from "../dayjs";

export const convertDateToHour = (dateStr: string): number => {
  const date = dayjs.utc(dateStr);
  return date.hour();
};

export const formatIsoDate = (isoDateString: string): string => {
  const date = dayjs(isoDateString);

  return date.format("MMMM D YYYY");
};

export const secondsToHours = (seconds: number): number => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return parseFloat((hours + minutes / 60).toFixed(2));
};

export const formatHoursToHM = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h <= 0 ? "" : h + "h"} ${m}m`;
};

export const formatIsoDateToHM = (isoDateString: string): string => {
  const date = dayjs.utc(isoDateString);
  return date.format("HH:mm");
};
