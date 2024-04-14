"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  console.log("NEXTAUTH_URL: ", process.env.NEXTAUTH_URL);
  console.log(
    "callbackURL: ",
    process.env.NEXTAUTH_URL + "/api/auth/callback/discord"
  );
  console.log(
    "Testing loading other env var just to check: ",
    process.env.DIRECT_URL
  );
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="max-w-xs w-full border rounded-md border-zinc-200 shadow shadow-sm gap-4 flex flex-col p-6">
        <p className="text-2xl font-medium">Sign in</p>
        <button
          onClick={() =>
            signIn("discord", {
              callbackUrl:
                process.env.NEXTAUTH_URL + "/api/auth/callback/discord",
            })
          }
          className="px-4 py-2 bg-violet-500 text-white font-medium rounded-lg "
        >
          Sign in with Discord
        </button>
      </div>
    </div>
  );
}
