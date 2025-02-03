"use client";

import { MainNav } from "@/components/main-nav";
import { CreativeGames } from "@/components/creative-games";
import { GroupInfo } from "@/components/group-info";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const groupId = params.groupId as string;

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-24">
        <GroupInfo />
        <CreativeGames groupId={groupId} />
      </main>
    </div>
  );
}
