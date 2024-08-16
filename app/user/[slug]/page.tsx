"use client";
import UserOverview from "@/components/user";
import { User, UsersResponse } from "@/lib/definitions/users";
import { useEffect, useState } from "react";

type UserPageProps = {
  params: {
    slug: string;
  };
};

export default function UserPage({ params }: UserPageProps) {
  const [userSleepData, setUserSleepData] =
    useState<UserWithSleepIntervals | null>(null);
  const { slug } = params;

  useEffect(() => {
    (async () => {
      try {
        const { users }: UsersResponse = await (
          await fetch("/api/users")
        ).json();

        const userArr = users.filter((u: User) => u.id === slug);
        const [user] = userArr;

        const { intervals }: SleepIntervalsResponse = await (
          await fetch(`/api/intervals/${slug}`)
        ).json();

        const sleepData = {
          id: slug,
          name: user.name,
          email: user.email,
          intervals,
        };
        setUserSleepData(sleepData);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    })();
  }, []);

  if (!userSleepData) return;
  return <UserOverview userData={userSleepData} />;
}
