"use client"

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import ConnectButton from "@/components/ConnectButton";

export default function LandingHeader() {
    const githubUrl = "https://github.com/unit-13-dev/tachi";
    
    return (
        <header className="border-b-4 rounded-b-3xl border-black bg-yellow-400 p-4 sticky top-0 z-50">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-black uppercase tracking-tight hover:underline decoration-4 flex items-center gap-2"
                >
                    <div className="text-3xl"></div>
                    <span>TACHI</span>
                </Link>
                <div className="flex items-center gap-4">
                    <ConnectButton />
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all p-2 flex items-center justify-center hover:bg-gray-100"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5 text-black" />
                    </a>
                </div>
            </div>
        </header>
    )
}