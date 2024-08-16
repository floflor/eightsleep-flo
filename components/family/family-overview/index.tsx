"use client";

import { UserSleepStats } from "@/lib/definitions/users";
import { formatHoursToHM } from "@/lib/utils/date-utils";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";

export default function FamilyOverview({
  sleepData,
}: {
  sleepData: UserSleepStats[];
}) {
  return (
    <section className="flex flex-col gap-y-5 mt-5 pl-5 pr-5 sm:pl-10 sm:pr-10 sm:gap-y-0">
      <h2 className="text-lg mb-2 font-semibold sm:text-xl">Members</h2>
      <div className="flex flex-col gap-y-2 sm:grid sm:grid-cols-3  sm:grid-rows-[auto_h-24_auto] sm:gap-4">
        {sleepData.map((user, i) => (
          <div key={i} className="flex flex-col gap-y-4">
            <div
              key={i}
              className="bg-[#F9F9FB] border border-[#D8D9E0] shadow-sm rounded-md flex flex-col p-5 gap-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">
                    {formatHoursToHM(user.totalSleep)}
                  </span>
                  <span className="text-xs">Total Sleep</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base sm:text-lg">{`${user.score}/100`}</span>
                  <span className="text-xs">Sleep Score</span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#D8D9E0]" />
              <ul className="list-inside list-disc">
                <li className="font-semibold text-base sm:text-lg">{`Light Sleep: ${formatHoursToHM(
                  user.lightSleepStage
                )}`}</li>
                <li className="font-semibold text-base sm:text-lg">{`Deep Sleep: ${formatHoursToHM(
                  user.deepSleepStage
                )}`}</li>
              </ul>
            </div>
            <Link
              aria-label={`View details for ${user.name}`}
              href={`/user/${user.id}`}
            >
              <div
                key={i}
                className="bg-white flex justify-between items-center p-3 border border-[#D8D9E0] rounded-md cursor-pointer hover:shadow hover:bg-[#FCFCFD] transition ease-in-out delay-75"
              >
                <div className="flex flex-col text-sm sm:text-base">
                  <p className="">{user.name}</p>
                  <p className=" ">{user.email}</p>
                </div>
                <LucideArrowRight aria-hidden="true" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
