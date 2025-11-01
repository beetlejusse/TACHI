import Layout from "../../components/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, BookOpen, Zap, Github, FileText, Cpu } from "lucide-react"
import Link from "next/link"

const devResources = [
  {
    icon: FileText,
    title: "API DOCUMENTATION",
    description: "COMPLETE API REFERENCE. INTEGRATE BETTORS INTO YOUR DAPP.",
    link: "#",
  },
  {
    icon: Code2,
    title: "SDK & LIBRARIES",
    description: "TYPESCRIPT SDK. REACT HOOKS. READY-TO-USE COMPONENTS.",
    link: "#",
  },
  {
    icon: BookOpen,
    title: "TUTORIALS",
    description: "LEARN HOW TO BUILD PREDICTION MARKETS ON MONAD.",
    link: "#",
  },
  {
    icon: Cpu,
    title: "SMART CONTRACTS",
    description: "OPEN SOURCE CONTRACTS. AUDITED. DEPLOYED ON MONAD.",
    link: "#",
  },
  {
    icon: Github,
    title: "GITHUB REPO",
    description: "FULL SOURCE CODE. CONTRIBUTE. BUILD WITH US.",
    link: "#",
  },
  {
    icon: Zap,
    title: "MONAD DOCS",
    description: "MONAD BLOCKCHAIN DOCUMENTATION. INTEGRATION GUIDES.",
    link: "#",
  },
]

const codeExamples = [
  {
    title: "PLACE A BET",
    language: "TypeScript",
    code: `import { MonadBets } from '@monadbets/sdk'

const bets = new MonadBets(walletAddress)

const result = await bets.placeBet({
  eventId: 'pitch-event-001',
  prediction: 'speaker_will_stutter',
  amount: '50',
  odds: '2.5'
})`,
  },
  {
    title: "FETCH LEADERBOARD",
    language: "TypeScript",
    code: `import { MonadBets } from '@monadbets/sdk'

const leaderboard = await MonadBets.getLeaderboard({
  limit: 10,
  offset: 0,
  timeframe: 'all_time'
})

console.log(leaderboard.predictors)`,
  },
  {
    title: "MINT NFT",
    language: "TypeScript",
    code: `import { MonadBets } from '@monadbets/sdk'

const nft = await MonadBets.mintWinNFT({
  betId: 'bet-12345',
  recipientAddress: walletAddress,
  metadata: { event: 'pitch', odds: '2.5' }
})

console.log('NFT Minted:', nft.tokenId)`,
  },
]

const builders = [
  {
    name: "INTEGRATION PROGRAM",
    desc: "PARTNER WITH BETTORS. EARN 20% COMMISSION. BUILD TOGETHER.",
    badge: "APPLY NOW",
  },
  {
    name: "GRANTS PROGRAM",
    desc: "$100K+ IN GRANTS FOR DEVELOPERS BUILDING ON BETTORS.",
    badge: "LEARN MORE",
  },
  {
    name: "BUG BOUNTY",
    desc: "FIND SECURITY ISSUES. EARN UP TO $10K. HELP SECURE MONAD.",
    badge: "SUBMIT",
  },
]

export default function DevHubPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-8">
            DEVELOPER
            <br />
            <span className="text-cyan-400">HUB</span>
          </h1>
          <p className="text-xl font-bold max-w-3xl mx-auto mb-8">
            BUILD THE FUTURE OF PREDICTION MARKETS ON MONAD. APIs. SDKs. DOCS. EVERYTHING YOU NEED.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#">
              <Button className="bg-pink-500 text-white border-4 border-white hover:bg-white hover:text-pink-500 font-black uppercase text-lg px-8 py-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                VIEW API DOCS
              </Button>
            </Link>
            <Link href="#">
              <Button className="border-4 border-white bg-transparent text-white hover:bg-white hover:text-black font-black uppercase text-lg px-8 py-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                GITHUB REPO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Resources */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase mb-12">
            <span className="text-pink-500">RESOURCES</span> FOR BUILDERS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {devResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <Link key={index} href={resource.link}>
                  <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all h-full cursor-pointer bg-yellow-50 hover:bg-yellow-100">
                    <Icon className="h-12 w-12 mb-4 text-black" />
                    <h3 className="text-xl font-black uppercase mb-4">{resource.title}</h3>
                    <p className="font-bold">{resource.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase mb-12">
            CODE <span className="text-cyan-400">EXAMPLES</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {codeExamples.map((example, index) => (
              <Card
                key={index}
                className="border-4 border-cyan-400 shadow-[8px_8px_0px_0px_rgba(6,182,212,1)] bg-gray-900 overflow-hidden"
              >
                <div className="bg-cyan-400 border-b-4 border-cyan-400 px-6 py-4">
                  <div className="font-black uppercase text-black">{example.title}</div>
                  <div className="text-xs font-bold text-black">{example.language}</div>
                </div>
                <div className="p-6">
                  <pre className="font-mono text-xs leading-relaxed overflow-x-auto">
                    <code className="text-cyan-300">{example.code}</code>
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Builder Programs */}
      <section className="bg-cyan-400 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase mb-12">
            BUILDER <span className="text-pink-500">PROGRAMS</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {builders.map((program, index) => (
              <Card key={index} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8">
                <h3 className="text-2xl font-black uppercase mb-4">{program.name}</h3>
                <p className="font-bold mb-6">{program.desc}</p>
                <Button className="w-full bg-black text-white border-3 border-black hover:bg-white hover:text-black font-black uppercase">
                  {program.badge}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-yellow-400 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "BUILDERS" },
              { number: "1200+", label: "GITHUB STARS" },
              { number: "$500K+", label: "GRANTS AWARDED" },
              { number: "99.9%", label: "UPTIME" },
            ].map((stat, index) => (
              <div key={index} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-5xl font-black mb-2">{stat.number}</div>
                <div className="font-bold uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monad Integration Benefits */}
      <section className="bg-pink-500 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-5xl font-black uppercase mb-12 text-white">
            WHY BUILD ON
            <br />
            <span className="text-black">BETTORS?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "10,000 TPS",
                desc: "LIGHTNING-FAST TRANSACTIONS. INSTANT SETTLEMENT. NO DELAYS.",
              },
              {
                title: "NEAR-ZERO FEES",
                desc: "MONAD'S OPTIMIZED CHAIN. MINIMUM GAS COSTS. MAXIMUM PROFIT.",
              },
              {
                title: "FULL ECOSYSTEM",
                desc: "NFT MINTING. TOKEN ECONOMICS. STAKING. EVERYTHING BUILT-IN.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8">
                <h3 className="text-2xl font-black uppercase mb-4">{benefit.title}</h3>
                <p className="font-bold">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8">
            READY TO
            <br />
            <span className="text-cyan-400">BUILD?</span>
          </h2>
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
            JOIN 500+ DEVELOPERS BUILDING THE FUTURE OF PREDICTION MARKETS ON MONAD.
          </p>
          <Link href="#">
            <Button className="bg-cyan-400 text-black border-4 border-white hover:bg-white hover:text-black font-black uppercase text-xl px-12 py-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              START BUILDING NOW
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
