import Link from "next/link";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export default function AppHeader() {
    return (
        <header className="border-b-4 border-black rounded-b-3xl bg-yellow-400 p-4 sticky top-0 z-50">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-black uppercase tracking-tight hover:underline decoration-4 flex items-center gap-2"
                >
                    <div className="text-3xl"></div>
                    <span>BETTORS</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/work" className="font-bold uppercase text-sm hover:underline decoration-4">
                        LIVE EVENTS
                    </Link>
                    <Link href="/leaderboard" className="font-bold uppercase text-sm hover:underline decoration-4">
                        LEADERBOARD
                    </Link>
                    <Link href="/dashboard" className="font-bold uppercase text-sm hover:underline decoration-4">
                        DASHBOARD
                    </Link>
                    <Link href="/nfts" className="font-bold uppercase text-sm hover:underline decoration-4">
                        NFTS
                    </Link>
                    {/* <Link href="/about" className="font-bold uppercase text-sm hover:underline decoration-4">
                        ABOUT
                    </Link> */}
                    {/* <Link href="/contact" className="font-bold uppercase text-sm hover:underline decoration-4">
                        CONTACT
                    </Link> */}
                </nav>
                <div>
                    {/* <Button className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        CONNECT
                    <Wallet className="ml-2 h-5 w-5" />
                    </Button> */}
                    <appkit-button />
                </div>
            </div>
        </header>
    )
}