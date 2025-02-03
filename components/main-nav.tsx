"use client"
import Link from "next/link"
import { GamepadIcon as GameController, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

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

export function MainNav() {
  const [groupName, setGroupName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const groupId = params.groupId as string

  useEffect(() => {
    async function fetchGroupName() {
      try {
        setLoading(true)
        const data = await fetchWithRetry(`https://groups.roproxy.com/v2/groups?groupIds=${groupId}`)
        if (data.data && data.data.length > 0) {
          setGroupName(data.data[0].name)
        }
      } catch (error) {
        console.error("Error fetching group name:", error)
        setGroupName("Group Name")
      } finally {
        setLoading(false)
      }
    }

    if (groupId) {
      fetchGroupName()
    }
  }, [groupId])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${groupId}`} className="flex items-center space-x-2">
          <GameController className="h-6 w-6 text-primary" />
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-lg font-bold">Loading...</span>
            </div>
          ) : (
            <span className="text-lg font-bold">{groupName}</span>
          )}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href={`/${groupId}/games`} className="text-sm font-medium hover:text-primary transition-colors">
            Games
          </Link>
        </nav>
      </div>
    </div>
  )
}

