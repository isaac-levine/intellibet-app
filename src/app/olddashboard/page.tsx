import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/stripe";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

import { Header } from "@/components/header";

export default async function Page() {
  const session = await getServerSession(authOptions);

  await createCustomerIfNull();
  let user = null;

  // pull in the user from the database based on the current user's email
  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
  }

  const manage_link =
    user && (await generateCustomerPortalLink("" + user?.stripe_customer_id));

  const hasSub = user && (await hasSubscription());
  const checkout_link =
    user && (await createCheckoutLink("" + user?.stripe_customer_id));

  return (
    <div className="max-w-5xl m-auto w-full">
      <Header user={user} />
      <div className="flex flex-col">
        {user ? (
          <div>
            <p className="text-2xl font-medium">
              {session?.user?.name}&apos;s dashboard
            </p>
            <div className="">
              {hasSub ? (
                <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium">
                  Subscribed
                </div>
              ) : (
                user && (
                  <div className="p-6 rounded-md border-rose-400 border shadow-sm font-medium flex items-center gap-2">
                    Haha! Broke ass bitch!
                    <Link
                      className="bg-black ml-auto text-white rounded-md px-2 py-1"
                      href={"" + checkout_link}
                    >
                      Upgrade
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full mb-3">
            <p className="text-2xl font-medium">Sign in to view dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}
