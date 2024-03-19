"use client";

import Link from "next/link";
import { ModeToggle } from "./ui/dark-mode-toggle";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { MenuIcon } from "lucide-react";
import { Transition } from "@headlessui/react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_item: string | null;
  api_key: string | null;
}

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu
  // return (
  //   <nav className="max-w-5xl m-auto w-full px-4 sticky top-0 bg-inherit backdrop-filter backdrop-blur-lg rounded-full border drop-shadow-lg mb-4">
  //     <div className="flex items-center gap-8 justify-between py-4">
  //       <Link
  //         href={"/"}
  //         className="text-2xl font-semibold text-black hover:opacity-90"
  //       >
  //         intellibet.io
  //       </Link>
  //       {/* <div className="flex items-center gap-4">
  //         <Link href="/#pricing">Pricing</Link>
  //         <Link href="/dashboard">Dashboard</Link>
  //         <ModeToggle />
  //         {user ? (
  //           <Link
  //             href="api/auth/signout"
  //             className="whitespace-nowrap font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
  //           >
  //             Sign out
  //           </Link>
  //         ) : (
  //           <Link
  //             href="/signin"
  //             className="whitespace-nowrap font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
  //           >
  //             Sign in
  //           </Link>
  //         )}
  //       </div> */}
  //       <div className="lg:hidden">
  //         <button onClick={() => setIsOpen(!isOpen)}>
  //           {isOpen ? (
  //             <XMarkIcon className="h-6 w-6" />
  //           ) : (
  //             <Bars3Icon className="h-6 w-6" />
  //           )}
  //         </button>
  //       </div>
  //       <div className={`${isOpen ? "" : "hidden"} lg:flex items-center gap-4`}>
  //         <Link href="/#pricing">Pricing</Link>
  //         <Link href="/dashboard">Dashboard</Link>
  //         <ModeToggle />
  //         {user ? (
  //           <Link
  //             href="api/auth/signout"
  //             className="whitespace-nowrap font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
  //           >
  //             Sign out
  //           </Link>
  //         ) : (
  //           <Link
  //             href="/signin"
  //             className="whitespace-nowrap font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
  //           >
  //             Sign in
  //           </Link>
  //         )}
  //       </div>
  //     </div>
  //   </nav>
  // );
  return (
    <nav className="max-w-5xl m-auto w-full px-4 sticky top-0 bg-inherit backdrop-filter backdrop-blur-lg rounded-full border drop-shadow-lg mb-4">
      <div className="flex items-center gap-8 justify-between py-4">
        <Link
          href={"/"}
          className="text-2xl font-semibold text-black hover:opacity-90"
        >
          intellibet.io
        </Link>
        <div className="relative lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1 font-semibold bg-white rounded-md shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  href="/#pricing"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Pricing
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Dashboard
                </Link>
                {user ? (
                  <Link
                    href="api/auth/signout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </Transition>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/#pricing"
            className="text-md text-black hover:opacity-90"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="text-md text-black hover:opacity-90"
          >
            Dashboard
          </Link>
          {user ? (
            <Link
              href="api/auth/signout"
              className="whitespace-nowrap font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
            >
              Sign out
            </Link>
          ) : (
            <Link
              href="/signin"
              className="whitespace-nowrap font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
