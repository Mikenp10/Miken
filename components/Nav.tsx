import Link from "next/link";
import { Camera } from "lucide-react";
import { ButtonLink } from "@/components/Button";

const links = [
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Booking", "/booking"],
  ["Contact", "/contact"]
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-display text-xl tracking-[0.22em] text-ivory">
          <Camera className="h-6 w-6 text-champagne" /> MLPVisuals
        </Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.22em] text-ivory/70 md:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-champagne">{label}</Link>)}
        </nav>
        <div className="hidden md:block"><ButtonLink href="/auth/login" variant="ghost">Client Login</ButtonLink></div>
      </div>
    </header>
  );
}
