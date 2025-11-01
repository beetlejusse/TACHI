import AppLayout from "@/components/Applayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-8">
            CONTACT
            <br />
            <span className="text-yellow-400">BETTORS</span>
          </h1>
          <p className="text-xl font-bold max-w-3xl mx-auto">
            QUESTIONS? IDEAS? WANT TO HOST AN EVENT? LET'S TALK. WE'RE HERE 24/7.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
              <h2 className="text-3xl font-black uppercase mb-8">GET IN TOUCH</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">FIRST NAME *</label>
                    <Input
                      required
                      className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      placeholder="JOHN"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-sm mb-2">LAST NAME *</label>
                    <Input
                      required
                      className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      placeholder="DOE"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold uppercase text-sm mb-2">EMAIL *</label>
                  <Input
                    type="email"
                    required
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                    placeholder="JOHN@EMAIL.COM"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-sm mb-2">SUBJECT *</label>
                  <select className="w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold p-3 bg-white">
                    <option>GENERAL INQUIRY</option>
                    <option>TECHNICAL SUPPORT</option>
                    <option>HOST AN EVENT</option>
                    <option>PARTNERSHIP</option>
                    <option>OTHER</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-sm mb-2">MESSAGE *</label>
                  <Textarea
                    required
                    rows={6}
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold resize-none"
                    placeholder="TELL US WHAT YOU THINK..."
                  />
                </div>
                <Button className="w-full bg-pink-500 text-white border-4 border-black hover:bg-black font-black uppercase text-lg py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  SEND MESSAGE
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                <h3 className="text-2xl font-black uppercase mb-6">QUICK LINKS</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6" />
                    <div>
                      <div className="font-bold uppercase text-sm">EMAIL</div>
                      <div className="font-black">HELLO@BETTORS.CO</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6" />
                    <div>
                      <div className="font-bold uppercase text-sm">PHONE</div>
                      <div className="font-black">+1 (555) BETS-101</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6" />
                    <div>
                      <div className="font-bold uppercase text-sm">HQ</div>
                      <div className="font-black">GLOBAL ONLINE</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6" />
                    <div>
                      <div className="font-bold uppercase text-sm">SUPPORT</div>
                      <div className="font-black">24/7 LIVE CHAT</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-pink-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-white">
                <h3 className="text-2xl font-black uppercase mb-4">HOST AN EVENT</h3>
                <div className="text-3xl font-black mb-4">EARN 10%</div>
                <p className="font-bold mb-6">
                  LIST YOUR EVENT ON BETTORS AND GET 10% OF ALL BETS PLACED. PASSIVE INCOME MADE SIMPLE.
                </p>
                <Button className="bg-black text-white border-4 border-white hover:bg-white hover:text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                  APPLY NOW
                </Button>
              </Card>

              <Card className="bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                <h3 className="text-2xl font-black uppercase mb-4">STATUS PAGE</h3>
                <p className="font-bold mb-4">CHECK SYSTEM STATUS, UPCOMING EVENTS, AND NETWORK STATUS IN REAL-TIME.</p>
                <Button className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                  VIEW STATUS
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      
    </AppLayout>
  )
}
