// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return (
    <div>
      <h1 className="text-4xl text-green-500">Nghiaflix</h1>
      <p className="text-white">Logged in as : {session?.user?.name}</p>
      <form action="/api/auth/signout" method="POST">
        <button className="h-10 w-full bg-white">Logout</button>
      </form>
    </div>
  );
}
