import Hero from "@/components/home/Hero";
import HomeContent from "@/components/home/HomeContent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  return <HomeContent />;
}
