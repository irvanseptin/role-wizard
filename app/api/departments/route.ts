// app/api/departments/route.ts
import { NextResponse } from "next/server";

const API_BASE_1 = process.env.NEXT_PUBLIC_API_BASE_1;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString(); // ambil _page, _limit, q, dsb.

    const res = await fetch(`${API_BASE_1}/departments?${query}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json([], { status: 500 });
  }
}
