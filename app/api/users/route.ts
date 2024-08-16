import { UsersResponse } from "@/lib/definitions/users";

export async function GET(request: Request) {
  const url = "https://s3.amazonaws.com/eight-public/challenge/users.json";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch sleep data");
    }

    const data: UsersResponse = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log("Error while fetching some of the routes");
  }
}
