import { NextResponse } from "next/server";
import prismadb from "@/lib/prsimadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.error("[FAVORITES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
