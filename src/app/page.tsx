import { Header } from "@/components/header";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, LockIcon } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let user = null;

  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
  }

  return (
    <>
      <Header user={user} />
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center sm:mt-20">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-mdhover:border-gray-300 hover:bg-white/50">
          <p className="text-md justify-center justify-center font-semibold text-gray-700">
            Intellibet is Currently in Private Beta
          </p>
        </div>

        <h1 className="mb-4 max-w-5xl text-5xl font-bold md:text-6xl lg:text-7xl text-navy">
          Track sports betting sentiment in{" "}
          <span className="underline font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lightgreen to-darkgreen">
            seconds
          </span>{" "}
          with{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-darkgreen to-lightgreen">
            intellibet.
          </span>
        </h1>

        <p className="mt-5 max-w-5xl text-zinc-700 sm:text-lg">
          Monitor the sentiment of any matchup you want using Intellibet.
          Whether you&apos;re a casual bettor or a seasoned pro, you can use the
          power of AI sentiment analysis and real-time social media data in
          seconds to take your betting game to the next level.
        </p>

        <Link
          className={buttonVariants({
            className: "mt-5 text-white bg-navy",
          })}
          href="https://p22yo9knlg6.typeform.com/to/XVpPvsyi"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>

        {/* PRODUCT PREVIEW SECTION */}
        <div>
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[lightgreen] to-[darkgreen] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>

            {/* HIDDEN IMAGE 1  */}
            {/* <div className="hidden">
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24 ">
                  <div className="background-gray-900/5 -m-2 rounded-xl p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-3xl lg:p-4 ">
                    <Image
                      src="/dashboard-preview.jpg"
                      alt="product preview"
                      width={1364}
                      height={866}
                      quality={100}
                      className="rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-8 md:p-20"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[lightgreen] to-[darkgreen] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>

        {/* FEATURE SECTION */}
        <div className="mx-auto mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 text-4xl font-bold text-navy sm:text-5xl">
                Start tracking the sentiment of your sports betting picks in
                realtime.
              </h2>
              <p className="text-large mt-4 text-gray-600">
                Intellibet allows you to monitor the sentiment of any matchup
                you want, powered by AI sentiment analysis of realtime social
                media data.
              </p>
            </div>
          </div>

          {/* Steps */}
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-green-700">
                  Step 1
                </span>
                <span className="text-xl font-semibold text-navy">
                  Sign up.
                </span>
                <span className="mt-2">
                  Start out with a free plan or choose our{" "}
                  <Link
                    href="/pricing"
                    className="text-green-700 underline underline-offset-2"
                  >
                    pro plan
                  </Link>
                  . Free members get one free analysis and pro members get up to
                  20+ games per day!
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-green-600">
                  Step 2
                </span>
                <span className="text-xl font-semibold text-navy">
                  Add your games.
                </span>
                <span className="mt-2 text-zinc-700">
                  Easily add whatever game you&apos;re watching or betting on to
                  your Watchlist through the member dashboard.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-green-600">
                  Step 3
                </span>
                <span className="text-xl font-semibold text-navy">
                  Start tracking.
                </span>
                <span className="mt-2 text-zinc-700">
                  We&apos;ll automatically start tracking the sentiment of your
                  games, providing you with real-time updates, graphs, and
                  notifications of any significant changes.
                </span>
              </div>
            </li>
          </ol>

          {/* HIDDEN IMAGE 2 */}
          {/* <div className="hidden mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24 ">
              <div className="background-gray-900/5 -m-2 rounded-xl p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-3xl lg:p-4 ">
                <Image
                  src="/file-upload-preview.jpg"
                  alt="uploading preview"
                  width={1419}
                  height={732}
                  quality={100}
                  className="rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-8 md:p-20"
                />
              </div>
            </div>
          </div> */}
        </div>
        <div className="mx-auto mb-32 mt-16 max-w-5xl sm:mt-56 px-6 lg:px-8 sm:text-center">
          <h2 className="mt-2 text-4xl font-bold text-navy sm:text-5xl">
            Apply to join the Private Beta.
          </h2>
          <p className="text-large mt-4 text-gray-600">
            We are currently accepting applications on a rolling basis. Apply to
            join the private beta so you can use the Intellibet dashboard,
            submit feature requests, and help us improve the product.
          </p>
          <Link
            className={buttonVariants({
              className: "mt-5 text-white bg-navy",
            })}
            href="https://p22yo9knlg6.typeform.com/to/XVpPvsyi"
          >
            Join Beta <LockIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="mx-auto mb-32 mt-4 max-w-5xl px-6 lg:px-8 sm:text-center">
          <h3 className="mt-2 text-large font-semibold text-navy sm:text-xl">
            Questions? Email <b>help@intellibet.io</b>
          </h3>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
