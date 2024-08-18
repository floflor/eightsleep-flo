"use client";
import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { UserSleepStats } from "@/lib/definitions/users";
import { generateHoursArray } from "@/lib/utils/sleep-utils";
import { convertDateToHour } from "@/lib/utils/date-utils";

export default function UserAreaChart({
  stats,
  timeSerie,
}: {
  stats: UserSleepStats;
  timeSerie: [string, number][];
}) {
  const hours = useMemo(() => {
    if (stats.bedStart && stats.wakeUpTime) {
      return generateHoursArray(stats.bedStart, stats.wakeUpTime);
    }
    return [];
  }, [stats.bedStart, stats.wakeUpTime]);

  const timeSerieMap = useMemo(() => {
    const map = new Map<number, number>();
    timeSerie.forEach(([dateStr, value]) => {
      const hour = convertDateToHour(dateStr);
      const roundedValue = Math.round(value * 100) / 100;
      map.set(hour, roundedValue);
    });
    return map;
  }, [timeSerie]);

  const filledValues = useMemo(() => {
    return hours.map((hour) => {
      return timeSerieMap.get(hour) ?? 0;
    });
  }, [hours, timeSerieMap]);

  const option = {
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#aaa",
        },
      },
      formatter: (params: any) => {
        const hour = params[0]?.name;
        const value = params[0]?.value;

        const formattedHour = `${hour}:00`;

        return `${formattedHour}<br /> ${value === 0 ? "No data" : value}`;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: hours,
      axisLabel: {
        formatter: (value: number) => `${value}:00`, 
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: filledValues,
        type: "line",
        areaStyle: {
          color: "#033f91",
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
}
