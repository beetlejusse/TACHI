"use client"

import { useEffect, useState } from "react"
import { useAppKitAccount } from "@reown/appkit/react"

interface User {
  id: string
  walletAddress: string
  username: string
  wins: number
  losses: number
  winRate: number
  monWon: string
  nfts: number
  streak: number
  streakType: string
  createdAt: string
  updatedAt: string
}

export function useWalletUser() {
  const { address, isConnected } = useAppKitAccount()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch or create user when wallet connects
  useEffect(() => {
    if (!isConnected || !address) {
      setUser(null)
      return
    }

    const fetchOrCreateUser = async () => {
      setLoading(true)
      setError(null)

      try {
        // Check if user exists
        const checkResponse = await fetch(`/api/users?walletAddress=${address}`)
        
        if (checkResponse.ok) {
          // User exists
          const userData = await checkResponse.json()
          setUser(userData)
        } else if (checkResponse.status === 404) {
          // User doesn't exist, create one
          const createResponse = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: address }),
          })

          if (createResponse.ok) {
            const newUser = await createResponse.json()
            setUser(newUser)
          } else {
            const errorData = await createResponse.json()
            throw new Error(errorData.error || "Failed to create user")
          }
        } else {
          throw new Error("Failed to fetch user")
        }
      } catch (err) {
        console.error("Error fetching/creating user:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchOrCreateUser()
  }, [isConnected, address])

  return {
    user,
    loading,
    error,
    isConnected,
    address,
  }
}

