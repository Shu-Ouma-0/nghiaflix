import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prsimadb";
import serverAuth from "@/lib/serverAuth";

// đúng cách: dùng type inference từ Next.js App Router
export async function GET(
  req: NextRequest,
  context: { params: { movieId: string } }
) {
  try {
    await serverAuth();

    const { movieId } = context.params;

    if (!movieId || typeof movieId !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return new NextResponse("Movie not found", { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("[MOVIE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
