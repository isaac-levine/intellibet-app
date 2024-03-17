import { Header } from "@/components/header";
import Image from "next/image";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {
  const session = await getServerSession(authOptions);
  let user = null;

  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
  }

  return (
    <main>
      <Header user={user} />
    </main>
  );
}
