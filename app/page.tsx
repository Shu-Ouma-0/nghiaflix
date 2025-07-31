// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import HomeClient from "@/components/HomeClient"; // tách logic client-side ra

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return <HomeClient />;
}
