"use client";

import { signIn } from "next-auth/react";

export default async function Page() {
  console.log("callBackUrl", process.env.NEXTAUTH_URL + "/dashboard");
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
