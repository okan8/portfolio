"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GamepadIcon as GameController, Eye } from "lucide-react"

interface StudioStats {
  totalGames: number
  totalPlayers: number
  totalVisits: number
}

export function StudioStats() {
  const [stats, setStats] = useState<StudioStats>({
    totalGames: 0,
    totalPlayers: 0,
    totalVisits: 0,
  })

  useEffect(() => {
    // Burada gerçek API çağrısı yapılacak
    // Şimdilik örnek veriler kullanıyoruz
    setStats({
      totalGames: 15,
      totalPlayers: 1000000,
      totalVisits: 5000000,
    })
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Oyun</CardTitle>
          <GameController className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGames}</div>
        </CardContent>
      </Card>
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

