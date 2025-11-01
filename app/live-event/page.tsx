"use client"

import AppLayout from "@/components/Applayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp } from "lucide-react"

// Static data for the current bet question
const currentBet = {
  question: "WILL THE FOUNDER STUTTER MORE THAN TWICE DURING THE PITCH?",
  category: "STARTUP PITCH EVENT",
  totalBets: 1245,
  yesOdds: "2.5x",
  noOdds: "1.8x",
  timeRemaining: "45m 23s",
}

// Static data for recent bets by other users
const recentBets = [
  {
    username: "ALPHA_BETTOR",
    choice: "YES",
    amount: "50 MON",
    timestamp: "2m ago",
    color: "bg-green-100",
  },
  {
    username: "PREDICTION_PRO",
    choice: "NO",
    amount: "75 MON",
    timestamp: "3m ago",
    color: "bg-red-100",
  },
  {
    username: "ORACLE_MASTER",
    choice: "YES",
    amount: "100 MON",
    timestamp: "4m ago",
    color: "bg-green-100",
  },
  {
    username: "MONAD_CHAMP",
    choice: "YES",
    amount: "25 MON",
    timestamp: "5m ago",
    color: "bg-green-100",
  },
  {
    username: "FORTUNE_TELLER",
    choice: "NO",
    amount: "150 MON",
    timestamp: "6m ago",
    color: "bg-red-100",
  },
  {
    username: "BET_NINJA",
    choice: "YES",
    amount: "30 MON",
    timestamp: "7m ago",
    color: "bg-green-100",
  },
  {
    username: "CHAIN_ORACLE",
    choice: "NO",
    amount: "60 MON",
    timestamp: "8m ago",
    color: "bg-red-100",
  },
  {
    username: "CRYPTO_SAGE",
    choice: "YES",
    amount: "45 MON",
    timestamp: "9m ago",
    color: "bg-green-100",
  },
]

// Static data for live leaderboard
const liveLeaderboard = [
  {
    rank: 1,
    username: "ALPHA_BETTOR",
    totalBets: 24,
    wins: 18,
    winRate: "75%",
  },
  {
    rank: 2,
    username: "ORACLE_MASTER",
    totalBets: 19,
    wins: 15,
    winRate: "79%",
  },
  {
    rank: 3,
    username: "PREDICTION_PRO",
    totalBets: 22,
    wins: 16,
    winRate: "73%",
  },
  {
    rank: 4,
    username: "MONAD_CHAMP",
    totalBets: 17,
    wins: 12,
    winRate: "71%",
  },
  {
    rank: 5,
    username: "FORTUNE_TELLER",
    totalBets: 15,
    wins: 11,
    winRate: "73%",
  },
  {
    rank: 6,
    username: "BET_NINJA",
    totalBets: 13,
    wins: 9,
    winRate: "69%",
  },
  {
    rank: 7,
    username: "CHAIN_ORACLE",
    totalBets: 11,
    wins: 8,
    winRate: "73%",
  },
  {
    rank: 8,
    username: "CRYPTO_SAGE",
    totalBets: 9,
    wins: 6,
    winRate: "67%",
  },
]

export default function LiveEventPage() {
  return (
    <AppLayout>
      <section className="bg-white min-h-screen py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Split Layout: 65% left, 35% right */}
          <div className="flex gap-6">
            {/* LEFT SIDE - 65% */}
            <div className="w-[65%] space-y-6">
              {/* Bet Question Section */}
              <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 bg-cyan-400">
                <div className="mb-6">
                  <div className="text-sm font-black uppercase mb-2 bg-yellow-400 border-2 border-black px-3 py-1 w-fit">
                    {currentBet.category}
                  </div>
                  <h1 className="text-4xl font-black uppercase mb-4 mt-4">{currentBet.question}</h1>
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="bg-white border-2 border-black px-3 py-1">
                      TOTAL BETS: {currentBet.totalBets}
                    </span>
                    <span className="bg-white border-2 border-black px-3 py-1">
                      TIME LEFT: {currentBet.timeRemaining}
                    </span>
                  </div>
                </div>

                {/* Yes/No Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Button className="bg-green-500 hover:bg-green-600 text-white border-4 border-black font-black uppercase text-xl py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    YES
                    <div className="text-sm font-bold mt-1">Odds: {currentBet.yesOdds}</div>
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white border-4 border-black font-black uppercase text-xl py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    NO
                    <div className="text-sm font-bold mt-1">Odds: {currentBet.noOdds}</div>
                  </Button>
                </div>
              </Card>

              {/* Recent Bets Section */}
              <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 bg-white">
                <h2 className="text-2xl font-black uppercase mb-6">RECENT BETS</h2>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {recentBets.map((bet, index) => (
                    <Card
                      key={index}
                      className={`border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 ${bet.color}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-black uppercase text-sm mb-1">{bet.username}</div>
                          <div className="text-xs font-bold text-gray-600">{bet.timestamp}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-lg mb-1">{bet.amount}</div>
                          <span
                            className={`border-2 border-black px-3 py-1 font-black text-xs ${
                              bet.choice === "YES" ? "bg-green-300" : "bg-red-300"
                            }`}
                          >
                            {bet.choice}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>

            {/* RIGHT SIDE - 35% */}
            <div className="w-[35%]">
              <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 bg-yellow-400">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="h-6 w-6" />
                  <h2 className="text-3xl font-black uppercase">LEADERBOARD</h2>
                </div>

                {/* Live Leaderboard Table */}
                <div className="bg-white border-4 border-black overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-pink-500 border-b-4 border-black">
                        <tr>
                          <th className="px-3 py-3 text-left font-black uppercase text-xs">RANK</th>
                          <th className="px-3 py-3 text-left font-black uppercase text-xs">USER</th>
                          <th className="px-3 py-3 text-left font-black uppercase text-xs">BETS</th>
                          <th className="px-3 py-3 text-left font-black uppercase text-xs">WINS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {liveLeaderboard.map((entry, index) => (
                          <tr
                            key={index}
                            className={`border-b-2 border-black ${
                              entry.rank <= 3 ? "bg-yellow-50" : "bg-white"
                            } hover:bg-yellow-100 transition-colors`}
                          >
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-2">
                                {entry.rank === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                                {entry.rank === 2 && <Trophy className="h-4 w-4 text-gray-400" />}
                                {entry.rank === 3 && <Trophy className="h-4 w-4 text-orange-600" />}
                                <span className="font-black text-sm">{entry.rank}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3 font-black uppercase text-xs">{entry.username}</td>
                            <td className="px-3 py-3 font-black">{entry.totalBets}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-green-600">{entry.wins}</span>
                                <span className="text-xs font-bold text-gray-600">({entry.winRate})</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Live Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 text-center">
                    <div className="text-xs font-bold uppercase text-gray-600 mb-1">ACTIVE</div>
                    <div className="text-2xl font-black">{liveLeaderboard.length}</div>
                    <div className="text-xs font-bold">BETTORS</div>
                  </Card>
                  <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 text-center">
                    <div className="text-xs font-bold uppercase text-gray-600 mb-1">TOTAL</div>
                    <div className="text-2xl font-black">
                      {liveLeaderboard.reduce((sum, entry) => sum + entry.totalBets, 0)}
                    </div>
                    <div className="text-xs font-bold">BETS</div>
                  </Card>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
