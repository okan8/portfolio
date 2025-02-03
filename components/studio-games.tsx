"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"

interface Game {
  id: number
  name: string
  description: string
  thumbnailUrl: string
  playing: number
  visits: number
  likes: number
}

export function StudioGames() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    // Burada gerçek API çağrısı yapılacak
    // Şimdilik örnek veriler kullanıyoruz
    setGames([
      {
        id: 1,
        name: "Awesome Adventure",
        description: "An exciting adventure game with stunning graphics and challenging puzzles.",
        thumbnailUrl: "/placeholder.svg",
        playing: 1500,
        visits: 1000000,
        likes: 50000,
      },
      {
        id: 2,
        name: "Space Explorer",
        description: "Explore the vast universe in this immersive space simulation game.",
        thumbnailUrl: "/placeholder.svg",
        playing: 2000,
        visits: 1500000,
        likes: 75000,
      },
      // Daha fazla oyun eklenebilir
    ])
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Oyunlar</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link href={`https://www.roblox.com/games/${game.id}`} key={game.id}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={game.thumbnailUrl || "/placeholder.svg"}
                    alt={game.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{game.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {game.playing}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {game.visits.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {game.likes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

