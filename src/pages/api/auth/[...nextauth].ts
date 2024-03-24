import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },
} as AuthOptions;

export default NextAuth(authOptions);
