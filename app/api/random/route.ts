// app/api/random/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prsimadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    await serverAuth(); // Không cần truyền `req` nếu bạn sửa `serverAuth` đúng cách

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.error("[RANDOM_GET]", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
