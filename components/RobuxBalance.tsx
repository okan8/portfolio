"use client"

import { useEffect, useState } from "react"
import { Coins } from "lucide-react"

export const RobuxBalance = () => {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("https://robux.tr/shopier/balance.php")
        const data = await response.json()
        setBalance(data.robux)
      } catch (error) {
        console.error("Error fetching balance:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()
    // Refresh balance every minute
    const interval = setInterval(fetchBalance, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg">
      <Coins className="h-5 w-5 mr-2 text-yellow-300" />
      <span className="font-medium">
        {isLoading ? (
          "Yükleniyor..."
        ) : balance !== null ? (
          <>
            Stok: <span className="text-yellow-300">{balance.toLocaleString()}</span> R$
          </>
        ) : (
          "Stok bilgisi alınamadı"
        )}
      </span>
    </div>
  )
}

