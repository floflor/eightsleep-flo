"use client";

import Loader from "@/components/loader/index";
import { User } from "@/lib/definitions/users";
import { useEffect, useState } from "react";
import Family from "@/components/family";

export default function Home() {
  const [usersSleepData, setUsersSleepData] = useState<UserWithSleepIntervals[]>([]);

  useEffect(() => {
    const fetchUsersAndSleepData = async () => {
      try {
        const usersResponse = await fetch("/api/users");
        const usersData: { users: User[] } = await usersResponse.json();

        const sleepDataPromises = usersData.users.map(async (user) => {
          const response = await fetch(`/api/intervals/${user.id}`);
          const data: SleepIntervalsResponse = await response.json();
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            intervals: data.intervals,
          };
        });

        const sleepDataResults = await Promise.all(sleepDataPromises);
        setUsersSleepData(sleepDataResults);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };

    fetchUsersAndSleepData();
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      <Loader />
      <Family usersSleepData={usersSleepData} />
    </main>
  );
}
