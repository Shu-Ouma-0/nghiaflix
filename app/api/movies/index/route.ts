// app/api/movies/index/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prsimadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    await serverAuth(); // Không cần truyền req nếu đã sửa serverAuth như hướng dẫn trước

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    console.error("[MOVIES_GET]", error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
