"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GamepadIcon, Eye } from "lucide-react"

export function TotalStats({ games }) {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalGames: 0,
    totalVisits: 0,
  })

  useEffect(() => {
    const totalPlayers = games.reduce((sum, game) => sum + game.playing, 0)
    const totalGames = games.length
    const totalVisits = games.reduce((sum, game) => sum + game.visits, 0)

    setStats({ totalPlayers, totalGames, totalVisits })
  }, [games])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Oyuncu</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPlayers.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Oyun</CardTitle>
          <GamepadIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGames.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Ziyaret</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

