import Link from "next/link";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export default function LandingHeader() {
    return (
        <header className="border-b-4 rounded-b-3xl border-black bg-yellow-400 p-4 sticky top-0 z-50">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-black uppercase tracking-tight hover:underline decoration-4 flex items-center gap-2"
                >
                    <div className="text-3xl"></div>
                    <span>BETTORS</span>
                </Link>
                <div>
                <appkit-button />
                    {/* <Button className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        CONNECT
                    </Button> */}
                    {/* <Wallet className="ml-2 h-5 w-5" /> */}
                </div>
            </div>
        </header>
    )
}