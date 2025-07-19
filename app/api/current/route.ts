// app/api/current/route.ts
import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (error) {
    console.error(error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
