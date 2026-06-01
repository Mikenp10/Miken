import Image from "next/image";
import { Maximize2, Play } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { portfolioItems } from "@/lib/site";

export default function PortfolioPage() {
  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Portfolio" title="Photography and videography in a refined visual archive.">Filter by portraits, weddings, branding, events, music videos, and editorial concepts. Select any image for a full-screen browser view.</SectionHeader>
      <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-3">
        {["All", "Portrait", "Weddings", "Branding", "Events", "Music Video", "Wedding Film"].map((cat) => <span key={cat} className="rounded-full border border-white/10 px-5 py-2 text-sm uppercase tracking-[0.2em] text-ivory/70">{cat}</span>)}
      </div>
      <div className="masonry mx-auto max-w-7xl">
        {portfolioItems.concat(portfolioItems).map((item, index) => (
          <a key={`${item.title}-${index}`} href={item.image} className="masonry-item group block overflow-hidden rounded-[1.5rem] bg-white/5" target="_blank">
            <div className="relative"><Image src={item.image} alt={item.title} width={900} height={index % 2 ? 1200 : 760} className="w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-transparent p-5 opacity-0 transition group-hover:opacity-100"><div><p className="text-xs uppercase tracking-[0.3em] text-champagne">{item.category}</p><h3 className="font-display text-3xl">{item.title}</h3></div>{item.type === "Videography" ? <Play /> : <Maximize2 />}</div></div>
          </a>
        ))}
      </div>
    </main>
  );
}
