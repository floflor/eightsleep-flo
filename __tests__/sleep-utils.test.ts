import {
  calculateAverageRespiratoryRate,
  calculateLowestHeartRate,
  calculateSleepHoursByStage,
  calculateSleepStagePercentages,
  calculateTimeInBed,
  calculateTotalSleepHours,
  calculateTotalTNT,
  calculateUserSleepStats,
  calculateWakeupTime,
  generateHoursArray,
} from "@/lib/utils/sleep-utils";

const sleepInterval: SleepInterval = {
  id: "interval-1",
  stages: [
    { stage: "light", duration: 3600 },
    { stage: "deep", duration: 1800 },
    { stage: "awake", duration: 600 },
    { stage: "out", duration: 300 },
  ],
  timeseries: {
    heartRate: [
      ["2024-08-18T00:00:00Z", 60],
      ["2024-08-18T01:00:00Z", 70],
      ["2024-08-18T02:00:00Z", 65],
    ],
    respiratoryRate: [
      ["2024-08-18T00:00:00Z", 16],
      ["2024-08-18T01:00:00Z", 15],
      ["2024-08-18T02:00:00Z", 14],
    ],
    tnt: [
      ["2024-08-18T00:00:00Z", 120],
      ["2024-08-18T01:00:00Z", 110],
      ["2024-08-18T02:00:00Z", 115],
    ],
    tempBedC: [["2017-02-28T05:00:00.000Z", 34.151399999999995]],
    tempRoomC: [["2017-02-28T05:00:00.000Z", 19.787400000000005]],
  },
  score: 85,
  ts: "2024-08-18T00:00:00Z",
};

const userWithSleepIntervals: UserWithSleepIntervals[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    intervals: [sleepInterval],
  },
];

describe("Sleep Utils", () => {
  test("calculateSleepHoursByStage calculates hours by stage correctly", () => {
    const lightSleepHours = calculateSleepHoursByStage(
      sleepInterval.stages,
      "light"
    );
    expect(lightSleepHours).toBe(1);
  });

  test("calculateTotalSleepHours calculates total sleep hours correctly", () => {
    const totalSleepHours = calculateTotalSleepHours(sleepInterval.stages);
    expect(totalSleepHours).toBe(1.5);
  });

  test("calculateLowestHeartRate calculates lowest heart rate correctly", () => {
    const lowestHR = calculateLowestHeartRate(
      sleepInterval.timeseries.heartRate
    );
    expect(lowestHR).toBe(60);
  });

  test("calculateAverageRespiratoryRate calculates average respiratory rate correctly", () => {
    const averageRR = calculateAverageRespiratoryRate(
      sleepInterval.timeseries.respiratoryRate
    );
    expect(averageRR).toBe(15);
  });

  test("calculateSleepStagePercentages calculates sleep stage percentages correctly", () => {
    const percentages = calculateSleepStagePercentages(sleepInterval.stages);
    expect(percentages).toEqual([
      { name: "awake", value: 9.52 },
      { name: "light", value: 57.14 },
      { name: "deep", value: 28.57 },
      { name: "out", value: 4.76 },
    ]);
  });

  test("calculateTimeInBed calculates time in bed correctly", () => {
    const timeInBed = calculateTimeInBed(sleepInterval.stages);
    expect(timeInBed).toBe(1.67);
  });

  test("calculateWakeupTime calculates wakeup time correctly", () => {
    const wakeupTime = calculateWakeupTime(sleepInterval);
    expect(wakeupTime).toBe("03:45");
  });

  test("calculateTotalTNT calculates total TNT correctly", () => {
    const totalTNT = calculateTotalTNT(sleepInterval.timeseries.tnt);
    expect(totalTNT).toBe(345);
  });

  test("calculateUserSleepStats calculates user sleep stats correctly", () => {
    const userStats = calculateUserSleepStats(userWithSleepIntervals);
    expect(userStats).toEqual([
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        deepSleepStage: 0.5,
        lightSleepStage: 1,
        totalSleep: 1.5,
        score: 85,
        lowestHR: 60,
        averageRR: 15,
        stagePercentages: [
          { name: "awake", value: 9.52 },
          { name: "light", value: 57.14 },
          { name: "deep", value: 28.57 },
          { name: "out", value: 4.76 },
        ],
        timeInBed: 1.67,
        bedStart: "00:00",
        wakeUpTime: "03:45",
        totalTnt: 345,
      },
    ]);
  });

  test("generateHoursArray generates array of hours correctly", () => {
    const hoursArray = generateHoursArray("09:00", "12:00");
    expect(hoursArray).toEqual([9, 10, 11, 12]);
  });
});
