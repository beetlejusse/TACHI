import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateUniqueUsername } from "@/lib/username-generator"

/**
 * GET /api/users?walletAddress=0x...
 * Get user by wallet address
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const walletAddress = searchParams.get("walletAddress")

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/users
 * Create a new user when wallet connects
 * Body: { walletAddress: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress } = body

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(existingUser)
    }

    // Generate unique username
    const checkUsernameExists = async (username: string) => {
      const user = await prisma.user.findUnique({
        where: { username },
      })
      return !!user
    }

    const username = await generateUniqueUsername(checkUsernameExists)

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        walletAddress: walletAddress.toLowerCase(),
        username,
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    console.error("Error creating user:", error)
    
    // Handle unique constraint violations
    if (error.code === "P2002") {
      // If somehow the wallet address already exists, fetch it instead
      const user = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
      })
      if (user) {
        return NextResponse.json(user)
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * PATCH /api/users
 * Update user data
 * Body: { walletAddress: string, ...fields to update }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, ...updateData } = body

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Calculate winRate if wins or losses are being updated
    if (updateData.wins !== undefined || updateData.losses !== undefined) {
      const currentUser = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
      })

      if (currentUser) {
        const totalWins = updateData.wins ?? currentUser.wins
        const totalLosses = updateData.losses ?? currentUser.losses
        const totalGames = totalWins + totalLosses
        updateData.winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0
      }
    }

    const updatedUser = await prisma.user.update({
      where: { walletAddress: walletAddress.toLowerCase() },
      data: updateData,
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

