import React from "react";
import AgentPulse from "./AgentPulse";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 bg-white dark:bg-background shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <AgentPulse size="small" color="blue" />
            </div>
            <h2 className="text-xl font-bold leading-none">ToolX</h2>
          </Link>

          {/* Right: Authentication and Actions */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                >
                  Manage Plan
                </Button>
              </Link>
              <div className="w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                {/* <Link href="/sign-in"> */}
                <Button variant="outline">Sign in</Button>
                {/* </Link> */}
              </SignInButton>
            </SignedOut>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
