export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const baseUrl = `https://s3.amazonaws.com/eight-public/challenge/${slug}.json`;

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch sleep data");
    }
    const data: SleepIntervalsResponse = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error("Error while fetching sleep intervals:", e);
    return new Response('Error fetching data', { status: 500 });
  }
}