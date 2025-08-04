import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prsimadb";
import serverAuth from "@/lib/serverAuth";

// Use Next.js built-in types for params
interface Context {
  params: {
    movieId: string;
  };
}

export async function GET(req: NextRequest, { params }: Context) {
  try {
    await serverAuth();

    const { movieId } = params;

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
