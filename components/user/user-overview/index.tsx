"use client";

import StatsCard from "@/components/user/stats-card";
import { UserSleepStats } from "@/lib/definitions/users";

export default function UserOverview({
  sleepData,
}: {
  sleepData: UserSleepStats;
}) {
  return (
    <section className="flex flex-col gap-y-5 mt-5 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:gap-y-0">
      <div className=" flex flex-col gap-y-2 sm:grid sm:grid-cols-3  sm:grid-rows-[auto_h-24_auto] sm:gap-4">
        <StatsCard
          value={sleepData.totalSleep}
          label="Total Sleep"
          formatHours
        />
        <StatsCard value={sleepData.score} label="Score" />
        <StatsCard value={sleepData.lowestHR} label="Lowest Heart Rate" />
        <StatsCard
          value={sleepData.averageRR}
          label="Average Breath Per Minute"
        />
        <StatsCard
          value={sleepData.lightSleepStage}
          label="Light Sleep Stage"
          formatHours
        />
        <StatsCard
          value={sleepData.deepSleepStage}
          label="Deep Sleep Stage"
          formatHours
        />
      </div>
    </section>
  );
}
