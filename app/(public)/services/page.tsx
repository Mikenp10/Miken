import { Check } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/lib/site";

export default function ServicesPage() {
  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Services" title="Premium visual packages for every milestone.">Start with a defined package or request a fully custom creative production.</SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => <article key={service.slug} className="luxury-border rounded-[2rem] bg-white/[0.03] p-8"><p className="text-sm uppercase tracking-[0.32em] text-champagne">{service.duration}</p><h2 className="mt-5 font-display text-4xl">{service.name}</h2><p className="mt-4 min-h-24 text-ivory/68">{service.description}</p><p className="mt-6 font-display text-4xl">{service.price ? `$${service.price.toLocaleString()}` : "Custom"}</p><ul className="mt-6 space-y-3 text-sm text-ivory/75">{["Secure client portal", "Deposit and payment tracking", "Private gallery delivery"].map((item) => <li key={item} className="flex gap-3"><Check className="h-5 w-5 text-champagne" />{item}</li>)}</ul><div className="mt-8"><ButtonLink href={`/booking?service=${service.slug}`}>Book package</ButtonLink></div></article>)}
      </div>
    </main>
  );
}
