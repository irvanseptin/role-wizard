import { NextResponse } from "next/server";

const API_BASE_1 = process.env.NEXT_PUBLIC_API_BASE_1;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString(); // _page, _limit

    const res = await fetch(`${API_BASE_1}/basicInfo?${query}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching basic info:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_BASE_1}/basicInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to submit" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error posting basic info:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
