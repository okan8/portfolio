"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

interface GroupInfo {
  id: number
  name: string
  owner: {
    id: number
    type: string
  }
  created: string
  memberCount: number
}

interface OwnerInfo {
  name: string
  displayName: string
  avatarUrl: string
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

export function GroupInfo() {
  const params = useParams()
  const groupId = params.groupId as string

  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    async function fetchGroupInfo() {
      try {
        setLoading(true)
        setError(null)
        setLoadingProgress(0)

        setLoadingProgress(20)
        const groupData = await fetchWithRetry(`https://groups.roproxy.com/v2/groups?groupIds=${groupId}`)
        if (groupData.data && groupData.data.length > 0) {
          const group = groupData.data[0]

          setLoadingProgress(40)
          const memberCountData = await fetchWithRetry(`https://groups.roproxy.com/v1/groups/${groupId}`)

          setGroupInfo({
            ...group,
            memberCount: memberCountData.memberCount || 0,
          })

          setLoadingProgress(60)
          const ownerId = group.owner.id
          const userData = await fetchWithRetry(`https://users.roproxy.com/v1/users/${ownerId}`)

          setLoadingProgress(80)
          const avatarData = await fetchWithRetry(
            `https://thumbnails.roproxy.com/v1/users/avatar-bust?userIds=${ownerId}&size=48x48&format=Png&isCircular=false`,
          )

          setOwnerInfo({
            name: userData.name,
            displayName: userData.displayName,
            avatarUrl: avatarData.data[0].imageUrl,
          })

          setLoadingProgress(100)
        }
      } catch (error) {
        console.error("Error fetching group info:", error)
        setError("Failed to load group information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (groupId) {
      fetchGroupInfo()
    }
  }, [groupId])

  if (loading) {
    return (
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Loading group information...</h1>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
            <div
              style={{ width: `${loadingProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500 ease-out"
            ></div>
          </div>
        </div>
        <p className="text-muted-foreground animate-pulse">
          {loadingProgress < 100 ? "Please wait, almost there..." : "Finalizing..."}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">{error}</h1>
      </div>
    )
  }

  if (!groupInfo) return null

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {groupInfo.name}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grup Sahibi</CardTitle>
          </CardHeader>
          <CardContent>
            {ownerInfo ? (
              <Link
                href={`https://www.roblox.com/users/${groupInfo.owner.id}/profile`}
                className="flex items-center space-x-3 group"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                  <Image
                    src={ownerInfo.avatarUrl || "/placeholder.svg"}
                    alt={ownerInfo.displayName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold group-hover:text-purple-400 transition-colors">
                    {ownerInfo.displayName}
                  </div>
                  <div className="text-sm text-muted-foreground">@{ownerInfo.name}</div>
                </div>
              </Link>
            ) : (
              <div>Loading owner information...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Üye Sayısı</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{groupInfo.memberCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">aktif üye</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kurulma Tarihi</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {new Date(groupInfo.created).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">tarihinde kuruldu</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

