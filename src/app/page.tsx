import { Header } from "@/components/header";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        <div className="mx-auto my-4 mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-mdhover:border-gray-300 hover:bg-white/50">
          <p className="text-md justify-center justify-center font-semibold text-gray-700">
            intellibet.io is currently in Private Beta.
          </p>
        </div>

        <h1 className="mb-4 max-w-5xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Track sports betting sentiment in{" "}
          <u>
            <i>seconds</i>
          </u>{" "}
          with <span className="text-purple-600">intellibet.io</span>
        </h1>

        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Intellibet allows you to monitor the sentiment of sports betting picks
          online in real-time. Stay informed and make smarter decisions.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/dashboard"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>

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
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>

            <div>
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
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
