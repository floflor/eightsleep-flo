interface SleepStage {
  stage: "awake" | "out" | "light" | "deep";
  duration: number;
}

interface TimeseriesData {
  tnt: [string, number][];
  tempRoomC: [string, number][];
  tempBedC: [string, number][];
  respiratoryRate: [string, number][];
  heartRate: [string, number][];
}

interface SleepInterval {
  id: string;
  ts: string;
  stages: SleepStage[];
  score: number;
  timeseries: TimeseriesData;
}

interface SleepIntervalsResponse {
  intervals: SleepInterval[]; 
}
