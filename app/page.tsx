// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return (
    <>
      <Navbar />
    </>
  );
}
