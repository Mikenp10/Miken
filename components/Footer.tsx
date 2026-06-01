import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 text-ivory/70 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div><p className="font-display text-2xl text-ivory">MLPVisuals</p><p className="mt-3 max-w-sm">{siteConfig.tagline}</p></div>
        <div><p className="text-sm uppercase tracking-[0.3em] text-champagne">Studio</p><p className="mt-3">{siteConfig.location}</p><p>{siteConfig.email}</p><p>{siteConfig.phone}</p></div>
        <div><p className="text-sm uppercase tracking-[0.3em] text-champagne">Social</p><div className="mt-3 flex gap-4">{siteConfig.socials.map((social) => <span key={social}>{social}</span>)}</div></div>
      </div>
    </footer>
  );
}
