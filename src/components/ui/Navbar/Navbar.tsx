import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

import s from "./Navbar.module.css";
import Navlinks from "./Navlinks";

const prisma = new PrismaClient();

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  // pull in the user from the database based on the current user's email
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}
