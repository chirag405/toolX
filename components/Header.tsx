import React from "react";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
// Removed: import { Button } from "./ui/button"; // DaisyUI will provide btn styles

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 left-0 z-50">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <AgentPulse size="small" color="blue" />
          ToolX
        </Link>
      </div>
      <div className="navbar-end">
        <SignedIn>
          <Link href="/manage-plan" className="mr-4">
            <button className="btn btn-primary">Manage Plan</button>
          </Link>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-base-300">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-outline btn-primary">Sign in</button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
