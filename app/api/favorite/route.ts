import { NextResponse } from "next/server";
import { without } from "lodash";

import prismadb from "@/lib/prsimadb";
import serverAuth from "@/lib/serverAuth";

// POST /api/favorite
export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId }
    });

    if (!existingMovie) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        }
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVORITE_POST]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

// DELETE /api/favorite
export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId }
    });

    if (!existingMovie) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[FAVORITE_DELETE]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
