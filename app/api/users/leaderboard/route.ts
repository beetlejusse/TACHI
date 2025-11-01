import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/users/leaderboard
 * Get leaderboard data sorted by wins, winRate, or monWon
 */
export async function GET() {
  try {
    // Get top users sorted by wins (primary), then by monWon (secondary)
    const users = await prisma.user.findMany({
      orderBy: [
        { wins: "desc" },
        { monWon: "desc" },
      ],
      take: 100, // Get top 100
      select: {
        id: true,
        walletAddress: true,
        username: true,
        wins: true,
        losses: true,
        winRate: true,
        monWon: true,
        nfts: true,
        streak: true,
        streakType: true,
      },
    })

    // Format the data to match leaderboard expectations
    const leaderboardData = users.map((user, index) => ({
      rank: index + 1,
      name: user.username,
      wins: user.wins,
      winRate: `${user.winRate.toFixed(0)}%`,
      $monWon: Number(user.monWon).toLocaleString(),
      nfts: user.nfts.toString(),
      streak: user.streak > 0 
        ? `${user.streak}${user.streakType === "WIN" ? "W" : "L"}` 
        : "0",
    }))

    return NextResponse.json(leaderboardData)
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

