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

  const watchlistItems = [
    "BOS vs. LAL",
    "NY vs. GS",
    "MIA vs. CHI",
    "PHI vs. ATL",
    "LAC vs. DAL",
    "POR vs. UTA",
    "MIL vs. BKN",
  ];

  return (
    <div className="max-w-7xl m-auto w-full">
      <Header user={user} />
      <div className="flex flex-col">
        {user ? (
          <div>
            <p className="text-xl font-medium text-center">
              {session?.user?.name}&apos;s dashboard
            </p>

            {hasSub ? (
              <div className="p-5 flex">
                <div className="w-1/4 rounded-md border-gray-400 border shadow-sm mr-1 h-screen">
                  <h1 className="text-center font-bold">Watchlist</h1>
                  <ul className="py-4">
                    {watchlistItems.map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 rounded border flex justify-between items-center"
                      >
                        {item}
                        <button className="text-red-400 hover:text-red-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-3/4 rounded-md border-gray-400 border shadow-sm ml-1 h-screen">
                  <h2 className="text-center font-bold">Sentiment Analysis</h2>
                </div>
              </div>
            ) : (
              user && (
                <div className="p-6 rounded-md border-rose-400 border shadow-sm font-medium flex items-center gap-2">
                  Sorry, only pro users can see the dashboard.
                  <Link
                    className="bg-black ml-auto text-white rounded-md px-2 py-1"
                    href={"" + checkout_link}
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              )
            )}
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
