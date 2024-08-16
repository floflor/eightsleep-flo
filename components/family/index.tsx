"use client";

import FamilyOverview from "@/components/family/family-overview";
import FamilyChart from "@/components/family/family-chart";
import { Button } from "@/components/ui/button";
import { calculateUserSleepStats } from "@/lib/utils/sleep-utils";
import { useState, useMemo } from "react";
import { formatIsoDate } from "@/lib/utils/date-utils";

export default function Family({
  usersSleepData,
}: {
  usersSleepData: UserWithSleepIntervals[];
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const uniqueDates = useMemo(() => {
    if (!usersSleepData.length) return [];

    const timestamps = usersSleepData.flatMap((user) =>
      user.intervals.map((interval) => formatIsoDate(interval.ts))
    );
    return [...new Set(timestamps)];
  }, [usersSleepData]);

  const sleepDataByDate = useMemo(() => {
    if (selectedDate) {
      return usersSleepData.map((user) => ({
        ...user,
        intervals: user.intervals.filter((interval) => {
          const intervalDate = formatIsoDate(interval.ts);
          return intervalDate === selectedDate;
        }),
      }));
    }
    return [];
  }, [selectedDate, usersSleepData]);

  if (uniqueDates.length > 0 && selectedDate === null) {
    setSelectedDate(uniqueDates[0]);
  }

  const sleepStats = useMemo(() => {
    return calculateUserSleepStats(sleepDataByDate);
  }, [sleepDataByDate]);

  return (
    <>
      <div className="flex flex-col-reverse gap-y-5 mt-16 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:flex-row sm:justify-between sm:items-center sm:mb-5">
        <h2 className="text-xl font-semibold sm:text-2xl">Family Overview</h2>
        <div className="flex gap-x-1 self-end sm:justify-between sm:gap-x-2">
          {uniqueDates.map((date, i) => (
            <Button
              onClick={() => setSelectedDate(date)}
              key={i}
              selected={selectedDate === date}
              aria-pressed={selectedDate === date}
            >
              {date}
            </Button>
          ))}
        </div>
      </div>
      <FamilyOverview sleepData={sleepStats} />
      <section aria-labelledby="sleep-scores-heading" className="flex flex-col gap-y-3 mt-12 pb-9 pt-9 bg-[#E7E8EC] ">
        <h2 className="text-lg font-bold pl-5 pr-5 sm:text-xl sm:pl-10 sm:pr-10">
          Sleep Scores
        </h2>
        {selectedDate && <FamilyChart type="scores" data={sleepStats} />}
      </section>
      <section className="flex flex-col gap-x-3 mt-12 pb-24 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:flex-row">
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-bold sm:text-xl">Sleep Stages</h2>
          {selectedDate && (
            <FamilyChart type="sleep_stages" data={sleepStats} />
          )}
        </div>
        <div className="flex flex-col w-full mt-12  sm:mt-0">
          <h2 className="text-lg font-bold sm:text-xl">Total Sleep Hours</h2>
          {selectedDate && <FamilyChart type="total_sleep" data={sleepStats} />}
        </div>
      </section>
    </>
  );
}
