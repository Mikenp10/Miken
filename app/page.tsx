import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { portfolioItems, testimonials } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
        <Image src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80" alt="Premium camera on a dark studio table" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/78 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.48em] text-champagne">Luxury visual studio</p>
            <h1 className="font-display text-6xl leading-[0.9] text-ivory md:text-8xl lg:text-9xl">Photography with cinematic restraint.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-ivory/75">MLPVisuals creates premium portraits, weddings, events, brand campaigns, and music videos with private gallery delivery and online booking built in.</p>
            <div className="mt-10 flex flex-wrap gap-4"><ButtonLink href="/booking">Book a session</ButtonLink><ButtonLink href="/portfolio" variant="ghost">View portfolio</ButtonLink></div>
          </div>
          <div className="luxury-border hidden rounded-[2rem] bg-white/5 p-5 shadow-glow backdrop-blur lg:block">
            <div className="grid gap-4">
              {portfolioItems.slice(0, 3).map((item) => <Image key={item.title} src={item.image} alt={item.title} width={700} height={420} className="h-44 rounded-[1.3rem] object-cover grayscale transition hover:grayscale-0" />)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Featured work" title="Still imagery and motion for people building a legacy.">Explore a curated preview of photography and video concepts designed for timeless impact.</SectionHeader>
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {portfolioItems.slice(0, 3).map((item) => <article key={item.title} className="group luxury-border overflow-hidden rounded-[2rem] bg-white/[0.03]"><Image src={item.image} alt={item.title} width={900} height={1100} className="h-[420px] w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><div className="p-6"><p className="text-xs uppercase tracking-[0.35em] text-champagne">{item.type}</p><h3 className="mt-3 font-display text-3xl">{item.title}</h3></div></article>)}
        </div>
      </section>

      <section className="bg-ivory px-4 py-24 text-obsidian sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div><p className="text-sm uppercase tracking-[0.4em] text-black/55">About MLPVisuals</p><h2 className="mt-4 font-display text-5xl md:text-7xl">Built for premium client experiences.</h2></div>
          <div className="space-y-6 text-lg leading-8 text-black/70"><p>Every booking, payment, gallery, favorite, and download is part of one polished platform. Clients get secure access to their private work while admins manage production from inquiry through delivery.</p><div className="grid gap-4 sm:grid-cols-3">{["Secure galleries", "Stripe payments", "Editorial delivery"].map((value) => <div key={value} className="rounded-2xl border border-black/10 p-5"><Sparkles className="mb-4 h-5 w-5" />{value}</div>)}</div></div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title="Trusted by clients who care about the details." />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">{testimonials.map((item) => <blockquote key={item.name} className="luxury-border rounded-[2rem] bg-white/[0.03] p-7"><Star className="h-5 w-5 fill-champagne text-champagne" /><p className="mt-6 text-lg leading-8 text-ivory/78">“{item.quote}”</p><footer className="mt-6 text-champagne">— {item.name}</footer></blockquote>)}</div>
        <div className="mt-14 text-center"><ButtonLink href="/booking">Start your booking</ButtonLink></div>
      </section>
    </main>
  );
}
