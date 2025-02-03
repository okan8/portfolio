"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { TotalStats } from "@/components/total-stats"
import Link from "next/link"
import { Users, Eye } from "lucide-react"
import { useParams } from "next/navigation"

interface GameCreator {
  id: number
  name: string
  type: string
}

interface GameDetails {
  id: number
  rootPlaceId: number
  name: string
  description: string
  creator: GameCreator
  playing: number
  visits: number
  created: string
  updated: string
  placeVisits: number
  favoritedCount: number
  maxPlayers: number
}

interface GameThumbnail {
  targetId: number
  state: string
  imageUrl: string
  version: string
}

interface GroupGamesResponse {
  data: Array<{
    id: number
    name: string
    rootPlace: { id: number }
  }>
}

interface DetailedGamesResponse {
  data: GameDetails[]
}

interface ThumbnailsResponse {
  data: GameThumbnail[]
}

async function fetchWithRetry(url: string, maxRetries = 5) {
  let retries = 0
  while (retries < maxRetries) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return await response.json()
      }
      if (response.status !== 429) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed for URL: ${url}. Error:`, error)
    }
    retries++
    await new Promise((resolve) => setTimeout(resolve, 1000 * retries))
  }
  throw new Error(`Max retries reached for URL: ${url}`)
}

export function CreativeGames() {
  const params = useParams()
  const groupId = params.groupId as string

  const [games, setGames] = useState<(GameDetails & { thumbnailUrl?: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true)
        setError(null)
        setLoadingProgress(0)

        setLoadingProgress(20)
        const groupData: GroupGamesResponse = await fetchWithRetry(
          `https://games.roproxy.com/v2/groups/${groupId}/games?accessFilter=Public&limit=50&sortOrder=Desc`,
        )

        const universeIds = groupData.data.map((game) => game.id).join(",")

        setLoadingProgress(40)
        const detailsData: DetailedGamesResponse = await fetchWithRetry(
          `https://games.roproxy.com/v1/games?universeIds=${universeIds}`,
        )

        setLoadingProgress(60)
        const thumbnailsData: ThumbnailsResponse = await fetchWithRetry(
          `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${universeIds}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`,
        )

        setLoadingProgress(80)
        const gamesWithThumbnails = detailsData.data.map((game: GameDetails) => ({
          ...game,
          thumbnailUrl: thumbnailsData.data.find((thumb: GameThumbnail) => thumb.targetId === game.id)?.imageUrl,
        }))

        setGames(gamesWithThumbnails)
        setLoadingProgress(100)
      } catch (error) {
        console.error("Error fetching games:", error)
        setError("Failed to load games. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (groupId) {
      fetchGames()
    }
  }, [groupId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading games...</h2>
          <p className="text-muted-foreground animate-pulse">
            {loadingProgress < 100 ? "Please wait, fetching game data..." : "Almost done..."}
          </p>
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <TotalStats games={games} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link href={`https://www.roblox.com/games/${game.rootPlaceId}`} key={game.id} className="group">
            <Card className="overflow-hidden transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 group-hover:border-purple-500/40 group-hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={game.thumbnailUrl || "/placeholder.svg"}
                    alt={game.name}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-purple-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{game.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{game.playing.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{game.visits.toLocaleString()}</span>
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

