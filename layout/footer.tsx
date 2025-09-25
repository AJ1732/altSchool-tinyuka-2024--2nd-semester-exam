"use client";
import Link from "next/link";

import { BrandMark } from "@/components/elements";
import { useAuth } from "@/features/auth/context";

export function Footer() {
  const { user } = useAuth();
  return (
    <footer className="content-grid h-12">
      <section className="flex items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4">
          <figure className="bg-avocado-200 text-avocado-500 font-contrail-one grid size-8 place-content-center rounded-full text-lg font-medium">
            {user ? user.email?.[0].toUpperCase() : "?"}
          </figure>
          <Link
            href={user ? "/profile" : "/signin"}
            className="text-sm font-normal max-md:sr-only"
          >
            {user ? "Profile" : "Sign in"}
          </Link>
        </div>

        <Link href={"/"} className="text-sm font-black max-md:ml-auto">
          TODO<span className="text-avocado-500">S</span>
        </Link>
        <BrandMark />
      </section>
    </footer>
  );
}
