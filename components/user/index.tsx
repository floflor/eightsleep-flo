/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { calculateUserSleepStats } from "@/lib/utils/sleep-utils";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import UserOverview from "./user-overview";
import UserPieChart from "./user-pie-chart";
import UserAreaChart from "./user-area-chart";
import { formatIsoDate } from "@/lib/utils/date-utils";

type UserParams = {
  userData: UserWithSleepIntervals;
};

export default function User({ userData }: UserParams) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const uniqueDates = useMemo(() => {
    const timestamps = userData.intervals?.map((interval) =>
      formatIsoDate(interval.ts)
    );
    return [...new Set(timestamps)];
  }, [userData]);

  const intervalByDate = useMemo(() => {
    return userData.intervals.filter((interval) => {
      const intervalDate = formatIsoDate(interval.ts);
      return intervalDate === selectedDate;
    });
  }, [selectedDate]);

  const sleepDataFiltered = [
    {
      name: userData.name,
      email: userData.email,
      id: userData.id,
      intervals: intervalByDate,
    },
  ];

  const sleepStats = useMemo(() => {
    if (intervalByDate?.length) {
      return calculateUserSleepStats(sleepDataFiltered);
    }
    return [];
  }, [intervalByDate]);

  if (uniqueDates.length > 0 && selectedDate === null) {
    setSelectedDate(uniqueDates[0]);
  }

  return (
    <>
      <div className="flex flex-col-reverse gap-y-5 mt-16 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:flex-row sm:justify-between sm:items-center sm:mb-5">
        <h2 className="text-xl font-semibold sm:text-2xl">{`Welcome ${userData?.name}`}</h2>
        <div className="flex gap-x-1 self-end sm:justify-between sm:gap-x-2">
          {uniqueDates.map((date, i) => (
            <Button
              onClick={() => setSelectedDate(date)}
              key={i}
              selected={selectedDate === date}
            >
              {date}
            </Button>
          ))}
        </div>
      </div>
      <UserOverview sleepData={sleepStats[0]} />
      <section className="flex flex-col gap-y-3 mt-12 pb-9 pt-9 pl-5 pr-5  bg-[#141414] text-white sm:flex-row sm:pl-10 sm:pr-10">
        <div className="flex flex-col sm:w-[40%]">
          <h2 className="  text-lg font-bold sm:text-xl ">Sleep Stages</h2>
          {selectedDate && <UserPieChart data={sleepStats[0]} />}
        </div>
        <div className="flex flex-col w-full items-center sm:w-[50%]">
          <h2 className="text-lg self-start font-bold sm:text-xl">
            Heart Rate
          </h2>
          {selectedDate && (
            <UserAreaChart
              timeSerie={intervalByDate[0].timeseries.heartRate}
              stats={sleepStats[0]}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col gap-x-3 mt-12 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:flex-row">
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-bold sm:text-xl">Respiratory Rate</h2>
          {selectedDate && (
            <UserAreaChart
              timeSerie={intervalByDate[0].timeseries.respiratoryRate}
              stats={sleepStats[0]}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col gap-x-3 mt-12 pb-12 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:flex-row">
        <div className="w-full flex flex-col sm:w-[50%]">
          <h2 className="text-lg font-bold sm:text-xl">Bed Temperature</h2>
          {selectedDate && (
            <UserAreaChart
              timeSerie={intervalByDate[0].timeseries.tempBedC}
              stats={sleepStats[0]}
            />
          )}
        </div>
        <div className="flex w-full flex-col  mt-12 sm:mt-0 sm:w-[50%]">
          <h2 className="text-lg font-bold sm:text-xl">Room Temperature</h2>
          {selectedDate && (
            <UserAreaChart
              timeSerie={intervalByDate[0].timeseries.tempRoomC}
              stats={sleepStats[0]}
            />
          )}
        </div>
      </section>
    </>
  );
}
