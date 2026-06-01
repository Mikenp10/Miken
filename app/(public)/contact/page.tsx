import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Contact" title="Tell us what you want the visuals to feel like." />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <form className="luxury-border grid gap-5 rounded-[2rem] bg-white/[0.03] p-8"><input placeholder="Name" className="rounded-xl border border-white/10 bg-black p-4" /><input placeholder="Email" type="email" className="rounded-xl border border-white/10 bg-black p-4" /><input placeholder="Project type" className="rounded-xl border border-white/10 bg-black p-4" /><textarea placeholder="Message" rows={6} className="rounded-xl border border-white/10 bg-black p-4" /><button className="rounded-full bg-ivory px-6 py-4 font-bold uppercase tracking-[0.24em] text-obsidian">Send inquiry</button></form>
        <div className="space-y-5 text-ivory/75"><div className="luxury-border rounded-3xl p-6"><Mail className="text-champagne" /><p className="mt-4">{siteConfig.email}</p></div><div className="luxury-border rounded-3xl p-6"><Phone className="text-champagne" /><p className="mt-4">{siteConfig.phone}</p></div><div className="luxury-border rounded-3xl p-6"><MapPin className="text-champagne" /><p className="mt-4">{siteConfig.location}</p></div><div className="luxury-border rounded-3xl p-6"><p className="text-sm uppercase tracking-[0.3em] text-champagne">Social</p><p className="mt-4">{siteConfig.socials.join(" • ")}</p></div></div>
      </div>
    </main>
  );
}
