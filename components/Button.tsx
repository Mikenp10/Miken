import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link href={href} className={clsx("inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition", variant === "primary" ? "bg-ivory text-obsidian hover:bg-champagne" : "luxury-border text-ivory hover:border-champagne hover:text-champagne")}>
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
