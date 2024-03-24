import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/stripe";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { prisma } from "@/lib/prisma";

import { Header } from "@/components/header";
import Watchlist from "./watchlist";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { LockIcon, Watch } from "lucide-react";

import dynamic from "next/dynamic";
const ChartOne = dynamic(() => import("@/components/charts/ChartOne"), {
  ssr: false, // This will disable server-side rendering for ChartOne.
});

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
    <>
      <Header user={user} />
      <MaxWidthWrapper>
        {user ? (
          <div>
            <p className="text-xl font-medium text-center mt-2">
              {session?.user?.name}&apos;s dashboard
            </p>
            {hasSub ? (
              <div className="flex mt-4">
                <Watchlist />
                <div className="w-3/4 rounded-md border-gray-400 border shadow-sm ml-1 h-screen">
                  <h2 className="text-center font-semibold">
                    Sentiment Analysis
                  </h2>
                  <ChartOne />
                </div>
              </div>
            ) : (
              // if the user is not a pro user, show this message
              user && (
                <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56 px-6 lg:px-8 sm:text-center">
                  <h2 className="mt-2 text-4xl font-bold text-navy sm:text-5xl">
                    Sorry {user.name}, only pro users can see the dashboard.
                    Apply to join the private beta.
                  </h2>

                  <Link
                    className={buttonVariants({
                      className: "mt-5 text-white bg-navy",
                    })}
                    href="https://p22yo9knlg6.typeform.com/to/XVpPvsyi"
                  >
                    Join Beta <LockIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full mb-3">
            <p className="mx-4 text-2xl font-medium mt-4 flex items-center justify-center">
              Sorry, the dashboard is currently only available to Beta users.
            </p>
          </div>
        )}
      </MaxWidthWrapper>
    </>
  );
}
