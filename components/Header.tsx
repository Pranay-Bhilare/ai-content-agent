"use client"

import Link from "next/link"
import { AgentPulse } from "./AgentPulse"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"

export function Header () {
    return (
        <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
            <div >
                <div className="flex items-center justify-between h-16">
                    {/* Left */}
                    <div className="flex items-center justify-between h-16 gap-2">
                        <Link href={'/'} className="px-4 flex items-center gap-1.5">
                            <AgentPulse size="small" /> 
                            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                                AgentTube
                            </h1>
                        </Link>
                    </div>

                    {/* Right */}
                    <div className = "flex items-center gap-4">
                        <SignedIn>
                            {/* <Link href={'manage-plan'}> 
                                <Button>
                                    Manage Plan
                                </Button>
                            </Link> */}
                            <div className="px-4 p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200"><UserButton/></div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant={"ghost"} className="text-xl bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent animate-pulse">
                                    SignIn 
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    )
}