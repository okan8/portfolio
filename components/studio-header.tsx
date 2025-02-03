import Link from "next/link"
import { GamepadIcon as GameController } from "lucide-react"

export function StudioHeader() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <GameController className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Saedec Studio</span>
        </Link>
        <nav>
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Ana Sayfa
          </Link>
        </nav>
      </div>
    </header>
  )
}

