import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, CreditCard, Download, Heart } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { portfolioItems, services } from "@/lib/site";

type DashboardBooking = {
  id: string;
  service_slug: string;
  package_name: string;
  date: string;
  time: string;
  status: string;
  payment_status: string;
};

type DashboardGallery = {
  id: string;
  title: string;
  cover_image_url?: string | null;
};

export default async function ClientDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: bookingRows } = supabase ? await supabase.from("bookings").select("*").order("created_at", { ascending: false }) : { data: null };
  const { data: galleryRows } = supabase ? await supabase.from("galleries").select("*").eq("is_published", true) : { data: null };
  const bookings: DashboardBooking[] = bookingRows ?? services.slice(0, 2).map((service, index) => ({ id: service.slug, service_slug: service.slug, package_name: "Signature", date: `2026-06-${10 + index}`, time: "14:00", status: index ? "approved" : "pending", payment_status: index ? "deposit_paid" : "unpaid" }));
  const galleries: DashboardGallery[] = galleryRows ?? [{ id: "demo", title: "Editorial Portrait Preview", cover_image_url: portfolioItems[0].image }];

  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl"><p className="text-sm uppercase tracking-[0.4em] text-champagne">Client dashboard</p><h1 className="mt-4 font-display text-6xl">Your bookings, payments, and galleries.</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-4">{([{ icon: CalendarCheck, label: "Bookings", value: bookings.length }, { icon: CreditCard, label: "Payments", value: "Stripe" }, { icon: Heart, label: "Favorites", value: "Selections" }, { icon: Download, label: "Downloads", value: "Approved" }] satisfies { icon: LucideIcon; label: string; value: string | number }[]).map(({ icon: Icon, label, value }) => <div key={label} className="luxury-border rounded-3xl bg-white/[0.03] p-6"><Icon className="h-7 w-7 text-champagne" /><p className="mt-4 text-sm uppercase tracking-[0.25em] text-ivory/55">{label}</p><p className="mt-2 font-display text-3xl">{value}</p></div>)}</div>
        <section className="mt-12 grid gap-8 lg:grid-cols-2"><div className="luxury-border rounded-[2rem] p-6"><h2 className="font-display text-4xl">Booking history</h2><div className="mt-6 space-y-4">{bookings.map((booking) => <div key={booking.id} className="rounded-2xl border border-white/10 p-5"><div className="flex items-center justify-between gap-4"><p className="font-semibold">{booking.package_name} • {booking.service_slug}</p><span className="rounded-full bg-champagne/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-champagne">{booking.status}</span></div><p className="mt-2 text-ivory/60">{booking.date} at {booking.time} • {booking.payment_status}</p></div>)}</div></div>
          <div className="luxury-border rounded-[2rem] p-6"><h2 className="font-display text-4xl">Private galleries</h2><div className="mt-6 grid gap-4">{galleries.map((gallery) => <Link key={gallery.id} href={`/gallery/${gallery.id}`} className="group relative overflow-hidden rounded-2xl"><Image src={gallery.cover_image_url || portfolioItems[1].image} alt={gallery.title} width={800} height={420} className="h-56 w-full object-cover grayscale transition group-hover:grayscale-0" /><div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 p-5"><p className="font-display text-3xl">{gallery.title}</p></div></Link>)}</div></div></section>
      </div>
    </main>
  );
}
