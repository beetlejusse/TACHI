import AppLayout from "@/components/Applayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function WorkPage() {
  const events = [
    {
      title: "STARTUP PITCH",
      category: "LIVE EVENT",
      date: "TODAY",
      description: "PREDICT IF THE FOUNDER WILL STUTTER MORE THAN TWICE",
      image: "/startup-pitch-event.png",
      color: "bg-yellow-400",
      odds: "2.5x",
      bets: "1,245",
    },
    {
      title: "AWARDS CEREMONY",
      category: "RED CARPET",
      date: "TOMORROW",
      description: "WILL THE WINNER CRY DURING THEIR SPEECH?",
      image: "/awards-ceremony-event.jpg",
      color: "bg-pink-500",
      odds: "3.2x",
      bets: "2,890",
    },
    {
      title: "TECH CONFERENCE",
      category: "KEYNOTE",
      date: "NEXT WEEK",
      description: "WILL THE SPEAKER MAKE A JOKE THAT LANDS?",
      image: "/tech-conference-keynote.png",
      color: "bg-cyan-400",
      odds: "1.8x",
      bets: "1,567",
    },
    {
      title: "LIVE STREAMING",
      category: "CONTENT",
      date: "TODAY",
      description: "WILL THEY REACH 100K VIEWERS IN FIRST HOUR?",
      image: "/live-streaming-event.png",
      color: "bg-yellow-400",
      odds: "2.1x",
      bets: "3,420",
    },
    {
      title: "PRODUCT LAUNCH",
      category: "ANNOUNCEMENT",
      date: "TOMORROW",
      description: "WILL THE DEMO WORK WITHOUT BUGS?",
      image: "/product-launch-event.png",
      color: "bg-pink-500",
      odds: "1.5x",
      bets: "2,110",
    },
    {
      title: "INTERVIEW SESSION",
      category: "MEDIA",
      date: "NEXT WEEK",
      description: "WILL THEY ANSWER ALL 10 QUESTIONS?",
      image: "/interview-event.jpg",
      color: "bg-cyan-400",
      odds: "2.8x",
      bets: "890",
    },
  ]

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-8">
            LIVE <span className="text-yellow-400">EVENTS</span>
          </h1>
          <p className="text-xl font-bold max-w-3xl mx-auto">
            REAL MOMENTS HAPPENING RIGHT NOW. PLACE YOUR BETS AND WATCH HISTORY UNFOLD.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-yellow-400 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {["ALL EVENTS", "LIVE NOW", "COMING SOON", "TRENDING"].map((filter) => (
              <Button
                key={filter}
                className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card
                key={index}
                className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden group hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="relative overflow-hidden">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <div className={`absolute top-4 left-4 ${event.color} border-2 border-black px-3 py-1`}>
                    <span className="font-black uppercase text-xs">{event.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black text-white border-2 border-black px-3 py-1">
                    <span className="font-black uppercase text-xs">{event.date}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black uppercase mb-2">{event.title}</h3>
                  <p className="font-bold mb-4 text-sm">{event.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-100 border-2 border-black p-2">
                      <div className="text-xs font-bold uppercase text-gray-600">Odds</div>
                      <div className="text-xl font-black">{event.odds}</div>
                    </div>
                    <div className="bg-gray-100 border-2 border-black p-2">
                      <div className="text-xs font-bold uppercase text-gray-600">Bets</div>
                      <div className="text-xl font-black">{event.bets}</div>
                    </div>
                  </div>
                  <Button className="w-full bg-black text-white border-4 border-black hover:bg-yellow-400 hover:text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    PLACE BET
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-500 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-5xl font-black uppercase mb-8 text-white">
            DON'T MISS
            <br />
            <span className="text-black">THE ACTION?</span>
          </h2>
          <Link href="/contact">
            <Button className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-black uppercase text-xl px-12 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              NOTIFY ME
            </Button>
          </Link>
        </div>
      </section>
    </AppLayout>
  )
}
