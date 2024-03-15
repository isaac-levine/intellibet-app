"use client";

import Link from "next/link";
import Logo from "@/components/icons/Logo";
import s from "./Navbar.module.css";

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  return (
    <div className="py-2 relative flex flex-row justify-between align-center">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
