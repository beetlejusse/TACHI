import AppLayout from "@/components/Applayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Trophy, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    {
      name: "ALEX BETA",
      role: "FOUNDER & CEO",
      description: "CRYPTO TRADER WHO TURNED PARTY BETS INTO A PLATFORM",
      image: "/founder-profile.jpg",
      color: "bg-yellow-400",
    },
    {
      name: "SARAH ODDS",
      role: "HEAD OF EVENTS",
      description: "EVENT COORDINATOR WITH INSIDER ACCESS TO EVERYTHING",
      image: "/events-coordinator.jpg",
      color: "bg-pink-500",
    },
    {
      name: "MIKE STACK",
      role: "TECH LEAD",
      description: "BLOCKCHAIN ENGINEER MAKING BETS INSTANT AND SECURE",
      image: "/tech-engineer.jpg",
      color: "bg-cyan-400",
    },
  ]

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8">
                ABOUT
                <br />
                <span className="text-yellow-400">BETTORS</span>
              </h1>
              <p className="text-xl font-bold mb-8">
                WE STARTED BECAUSE PREDICTING OUTCOMES IS THE MOST THRILLING THING HUMANS DO. WE'RE MAKING IT GLOBAL,
                INSTANT, AND ACCESSIBLE.
              </p>
            </div>
            <div className="relative">
              <div className="bg-yellow-400 border-4 border-white p-8 shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transform -rotate-2">
                <div className="text-6xl font-black mb-4">2024</div>
                <div className="font-bold uppercase">WHEN MICRO BETS BECAME MAINSTREAM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase text-center mb-16">BY THE NUMBERS</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "10K+", label: "ACTIVE PREDICTORS" },
              { icon: Trophy, number: "500K+", label: "BETS PLACED" },
              { icon: TrendingUp, number: "$2.5M", label: "TOTAL WINNINGS" },
              { icon: Zap, number: "24/7", label: "LIVE EVENTS" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-black mb-2">{stat.number}</div>
                <div className="font-bold uppercase text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase text-center mb-16">
            MEET THE <span className="text-pink-500">PREDICTION</span> TEAM
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute bottom-4 left-4 ${member.color} border-2 border-black px-3 py-1`}>
                    <span className="font-black uppercase text-xs">{member.role}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black uppercase mb-3">{member.name}</h3>
                  <p className="font-bold text-sm">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase text-center mb-16">
            WHY <span className="text-cyan-400">BETTORS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "INSTANT PAYOUTS",
                description: "NO WAITING. WIN AND GET PAID IMMEDIATELY. REAL MONEY, REAL SPEED.",
                color: "bg-yellow-400",
              },
              {
                title: "TRANSPARENT ODDS",
                description: "NO HIDDEN FEES. NO MANIPULATION. PURE PREDICTION MARKET LOGIC.",
                color: "bg-pink-500",
              },
              {
                title: "GLOBAL COMMUNITY",
                description: "COMPETE WITH 10K+ PREDICTORS FROM AROUND THE WORLD.",
                color: "bg-cyan-400",
              },
              {
                title: "SECURE & FAST",
                description: "BLOCKCHAIN VERIFIED. DECENTRALIZED. YOUR BETS. YOUR WINS.",
                color: "bg-yellow-400",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className={`${value.color} border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all`}
              >
                <h3 className="text-2xl font-black uppercase mb-4 text-black">{value.title}</h3>
                <p className="font-bold text-black">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-500 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-5xl font-black uppercase mb-8 text-white">
            JOIN THE
            <br />
            <span className="text-black">PREDICTION REVOLUTION</span>
          </h2>
          <Link href="/contact">
            <Button className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-black uppercase text-xl px-12 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              START PREDICTING
            </Button>
          </Link>
        </div>
      </section>
    </AppLayout>
  )
}
