"use client";

import { UserSleepStats } from "@/lib/definitions/users";
import { Card } from "../../ui/card";
import { formatHoursToHM } from "@/lib/utils/date-utils";

export default function UserOverview({
  sleepData,
}: {
  sleepData: UserSleepStats;
}) {
  return (
    <section className="flex flex-col gap-y-5 mt-5 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:gap-y-0">
      <div className=" flex flex-col gap-y-2 sm:grid sm:grid-cols-3  sm:grid-rows-[auto_h-24_auto] sm:gap-4">
        <Card>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              {formatHoursToHM(sleepData.totalSleep)}
            </span>
            <span className="text-xs">Total Sleep</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{sleepData.score}</span>
            <span className="text-xs">Score</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{sleepData.lowestHR}</span>
            <span className="text-xs">Lowest Heart Rate</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{sleepData.averageRR}</span>
            <span className="text-xs">Average Breath Per Minute</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              {formatHoursToHM(sleepData.lightSleepStage)}
            </span>
            <span className="text-xs">Light Sleep Stage</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              {formatHoursToHM(sleepData.deepSleepStage)}
            </span>
            <span className="text-xs">Deep Sleep Stage</span>
          </div>
        </Card>
      </div>
    </section>
  );
}
