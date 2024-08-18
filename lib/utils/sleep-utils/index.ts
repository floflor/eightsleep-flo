import { UserSleepStats } from "../../definitions/users";
import { formatIsoDateToHM, secondsToHours } from "../date-utils";
import dayjs from "../dayjs";

export const calculateSleepHoursByStage = (
  stages: SleepStage[],
  stageType: string
) => {
  const sleepSeconds = stages
    .filter((s) => s.stage === stageType)
    .map((stage) => stage.duration)
    .reduce((total, duration) => total + duration, 0);

  return secondsToHours(sleepSeconds);
};

export const calculateTotalSleepHours = (stages: SleepStage[]) => {
  const totalSleepSeconds = stages
    .filter((s) => s.stage !== "out" && s.stage !== "awake")
    .map((stage) => stage.duration)
    .reduce((total, duration) => total + duration, 0);

  return secondsToHours(totalSleepSeconds);
};

export const calculateLowestHeartRate = (timeSerie: [string, number][]) => {
  const heartRates = timeSerie.map(([, value]) => value);
  return Math.round(Math.min(...heartRates));
};

export const calculateAverageRespiratoryRate = (
  timeSerie: [string, number][]
) => {
  const respiratoryRates = timeSerie.map(([, value]) => value);
  const sum = respiratoryRates.reduce((total, rate) => total + rate, 0);
  return Math.round(sum / respiratoryRates.length);
};

export const calculateSleepStagePercentages = (stages: SleepStage[]) => {
  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);

  const stageDurations: Record<"awake" | "light" | "deep" | "out", number> =
    stages.reduce(
      (result, stage) => {
        if (stage.stage in result) {
          result[stage.stage] += stage.duration;
        }
        return result;
      },
      {
        awake: 0,
        light: 0,
        deep: 0,
        out: 0,
      }
    );

  const percentages = Object.entries(stageDurations).map(
    ([stage, duration]) => ({
      name: stage as "awake" | "light" | "deep" | "out",
      value: Number(((duration / totalDuration) * 100).toFixed(2)),
    })
  );

  return percentages;
};

export const calculateTimeInBed = (stages: SleepStage[]): number => {
  const activeStages = ["awake", "light", "deep"];
  const seconds = stages
    .filter((stage) => activeStages.includes(stage.stage))
    .reduce((total, stage) => total + stage.duration, 0);
  return secondsToHours(seconds);
};

export const calculateWakeupTime = (interval: SleepInterval): string => {
  const totalSleepDuration = interval.stages.reduce(
    (sum, stage) => sum + stage.duration,
    0
  );

  const bedtime = dayjs(interval.ts);

  const wakeupTime = bedtime.add(totalSleepDuration, "seconds");

  return wakeupTime.format("HH:mm");
};

export const calculateTotalTNT = (timeSerie: [string, number][]) => {
  return timeSerie.reduce((total, [, value]) => total + value, 0);
};

export const calculateUserSleepStats = (
  data: UserWithSleepIntervals[]
): UserSleepStats[] => {
  return data.map((user) => {
    const [interval] = user.intervals;

    const lightSleepHours = calculateSleepHoursByStage(
      interval.stages,
      "light"
    );
    const deepSleepHours = calculateSleepHoursByStage(interval.stages, "deep");
    const totalSleepHours = calculateTotalSleepHours(interval.stages);
    const lowestHR = calculateLowestHeartRate(interval.timeseries.heartRate);
    const averageRR = calculateAverageRespiratoryRate(
      interval.timeseries.respiratoryRate
    );
    const stagePercentages = calculateSleepStagePercentages(interval.stages);
    const timeInBed = calculateTimeInBed(interval.stages);
    const wakeUpTime = calculateWakeupTime(interval);
    const score = interval.score;
    const bedStart = formatIsoDateToHM(interval.ts);
    const totalTnt = calculateTotalTNT(interval.timeseries.tnt);

    return {
      id: user.id,
      name: user?.name,
      email: user?.email,
      deepSleepStage: deepSleepHours,
      lightSleepStage: lightSleepHours,
      totalSleep: totalSleepHours,
      score,
      lowestHR,
      averageRR,
      stagePercentages,
      timeInBed,
      bedStart,
      wakeUpTime,
      totalTnt,
    };
  });
};

export const generateHoursArray = (start: string, end: string): number[] => {
  const format = "HH:mm";
  let startTime = dayjs(start, format, true);
  let endTime = dayjs(end, format, true);

  const hours: number[] = [];
  let currentTime = startTime;

  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    hours.push(currentTime.hour());
    currentTime = currentTime.add(1, "hour");
  }

  return hours;
};
