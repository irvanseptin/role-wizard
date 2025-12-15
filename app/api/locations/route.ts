// app/api/locations/route.ts
import { NextResponse } from "next/server";

const API_BASE_2 = process.env.NEXT_PUBLIC_API_BASE_2;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const res = await fetch(`${API_BASE_2}/locations?${query}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json([], { status: 500 });
  }
}
