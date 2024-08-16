export type User = {
  id: string;
  name: string;
  email: string;
};

type StagePercentage = {
  name: "awake" | "light" | "deep" | "out";
  value: number;
};

export interface UserSleepStats {
  id: string;
  email: string;
  name: string;
  deepSleepStage: number;
  lightSleepStage: number;
  totalSleep: number;
  score: number;
  lowestHR: number;
  averageRR: number;
  stagePercentages: StagePercentage[];
  timeInBed: number;
  bedStart: string;
  wakeUpTime: string;
  totalTnt: number;
}

export interface UsersResponse {
  users: User[];
}
