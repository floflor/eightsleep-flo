"use client";
import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { UserSleepStats } from "@/lib/definitions/users";
import { formatHoursToHM } from "@/lib/utils/date-utils";

export default function FamilyChart({
  data,
  type,
}: {
  data: UserSleepStats[];
  //TODO: SET ENUM
  type: "scores" | "sleep_stages" | "total_sleep";
}) {
  const users = useMemo(() => data.map((user) => user.name), [data]);
  const scores = useMemo(() => data.map((user) => user.score ?? 0), [data]);
  const seriesArr =
    type === "scores"
      ? [
          {
            name: "Sleep Score",
            type: "bar",
            data: scores,
            label: {
              show: true,
              position: "insideRight",
            },
            itemStyle: {
              color: "#033f91",
            },
          },
        ]
      : type === "sleep_stages"
      ? [
          {
            name: "Light",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              formatter: (params: any) => formatHoursToHM(params.value),
            },
            data: data.map((users) => users.lightSleepStage),
            itemStyle: {
              color: "#3E80E6",
            },
          },

          {
            name: "Deep",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              formatter: (params: any) => formatHoursToHM(params.value),
            },
            data: data.map((users) => users.deepSleepStage),
            itemStyle: {
              color: "#033f91",
            },
          },
        ]
      : [
          {
            name: "Total Sleep Hours",
            type: "bar",
            data: data.map((users) => users.totalSleep),
            label: {
              show: true,
              formatter: (params: any) => formatHoursToHM(params.value),
            },
            itemStyle: {
              color: "#033f91",
            },
          },
        ];

  const option = {
    backgroundColor: type == "scores" ? "#E7E8EC" : "#FFFFFF",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "3%",
      left: "3%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      name: type == "scores" ? "Score" : "Hours",
      max: type == "scores" ? 100 : null,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000000", // Color de la línea del eje Y
        },
      },
      splitLine: {
        show: true, // Muestra las líneas guía internas (de la cuadrícula)
        lineStyle: {
          color: "#CDCED7", // Color de las líneas guía internas
          width: 1, // Ancho de las líneas guía internas
        },
      },
    },
    yAxis: {
      type: "category",
      data: users,
      name: "User",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000000", // Color de la línea del eje Y
        },
      },
    },
    series: seriesArr,
  };

  return (
    <div className="w-full">
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
}
