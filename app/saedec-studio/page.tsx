import { StudioHeader } from "@/components/studio-header"
import { StudioStats } from "@/components/studio-stats"
import { StudioGames } from "@/components/studio-games"
import { Footer } from "@/components/footer"

export default function SaedecStudioPage() {
  return (
    <div className="min-h-screen bg-background">
      <StudioHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Saedec Studio</h1>
        <StudioStats />
        <StudioGames />
      </main>
      <Footer />
    </div>
  )
}

