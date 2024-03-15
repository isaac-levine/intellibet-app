import Link from "next/link";

interface User {
  name: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <nav className="max-w-5xl m-auto w-full px-4 sticky top-0">
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
          {user ? (
            <Link
              href="api/auth/signout"
              className="font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
            >
              Sign out
            </Link>
          ) : (
            <Link
              href="/signin"
              className="font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
