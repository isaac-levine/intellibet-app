import Link from "next/link";
import { ModeToggle } from "./ui/dark-mode-toggle";

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
  return (
    <nav className="max-w-5xl m-auto w-full px-4 sticky top-0 bg-inherit backdrop-filter backdrop-blur-lg rounded-full border drop-shadow-lg mb-4">
      <div className="flex items-center gap-8 justify-between py-4">
        <Link
          href={"/"}
          className="text-2xl font-semibold text-black hover:opacity-90"
        >
          intellibet.io
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/#pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
          <ModeToggle />
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
