import { MainNav } from "@/components/main-nav"
import { CreativeGames } from "@/components/creative-games"
import { GroupInfo } from "@/components/group-info"

export default function GroupPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-24">
        <GroupInfo />
        <CreativeGames />
      </main>
    </div>
  )
}

