import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LandingHeader from "@/components/LandingHeader"
import AppHeader from "@/components/AppHeader"

interface LayoutProps {
  children: React.ReactNode
  isLanding?: boolean
}

export default function AppLayout({ children, isLanding }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {
        isLanding ? <LandingHeader /> : <AppHeader />
      }

      {children}

      {/* Footer */}
      <footer className="bg-black text-white border-t-4 border-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-black uppercase mb-4 flex items-center gap-2">
                <div></div>
                <span>BETTORS</span>
              </div>
              <p className="font-bold">PREDICT ON MONAD. LIGHTNING-FAST SETTLEMENTS. EARN $MON. MINT NFTS. WIN BIG.</p>
              <div className="mt-4 text-xs font-bold">POWERED BY MONAD BLOCKCHAIN</div>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase mb-4">NAVIGATE</h3>
              <ul className="space-y-2 font-bold">
                <li>
                  <Link href="/work" className="hover:text-yellow-400">
                    LIVE EVENTS
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-yellow-400">
                    LEADERBOARD
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-yellow-400">
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link href="/nfts" className="hover:text-yellow-400">
                    NFTS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase mb-4">COMPANY</h3>
              <ul className="space-y-2 font-bold">
                <li>
                  <Link href="/about" className="hover:text-yellow-400">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-yellow-400">
                    CONTACT
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    DOCS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    GITHUB
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase mb-4">SUPPORT</h3>
              <div className="space-y-2 font-bold">
                <div>HELLO@MONADBETS.IO</div>
                <div>+1 (555) MONAD-1</div>
                <div>24/7 LIVE SUPPORT</div>
                <div className="mt-4 text-xs">ON MONAD MAINNET</div>
              </div>
            </div>
          </div> */}
          <div className="border-t-4 border-white mt-6 pt-2 text-center font-bold uppercase">
            © 2025 BETTORS - PREDICT. EARN. WIN. POWERED BY MONAD BLOCKCHAIN
          </div>
        </div>
      </footer>
    </div>
  )
}
