"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { UserSleepStats } from "@/lib/definitions/users";

export default function UserPieChart({ data }: { data: UserSleepStats }) {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: (value: any) => value.value + " %",
    },
    series: [
      {
        name: "Sleep Stage",
        type: "pie",
        radius: "70%",
        data: data.stagePercentages,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        color: ["#D9E9FF", "#8CB8FF", "#033f91", "#3E80E6"],
        label: {
          show: true,
          color: "#ffffff",
          fontSize: 14,
        },
        labelLine: {
          show: true,
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
