import { CalendarDays } from "lucide-react";
import { submitBooking } from "@/lib/actions/booking";
import { services } from "@/lib/site";

export default function BookingPage() {
  const times = ["09:00", "11:30", "14:00", "16:30", "19:00"];
  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="text-sm uppercase tracking-[0.4em] text-champagne">Booking</p><h1 className="mt-4 font-display text-6xl">Reserve your creative date.</h1><p className="mt-6 text-lg leading-8 text-ivory/70">Choose a service, package, available date/time, and pay the deposit through Stripe when configured.</p><div className="mt-8 rounded-[2rem] border border-champagne/30 bg-champagne/10 p-6"><CalendarDays className="h-8 w-8 text-champagne" /><p className="mt-4 text-sm uppercase tracking-[0.25em]">Admin approval flow</p><p className="mt-2 text-ivory/70">Bookings enter pending status for approval, decline, or reschedule.</p></div></div>
        <form action={submitBooking} className="luxury-border grid gap-5 rounded-[2rem] bg-white/[0.03] p-6 md:p-10">
          <label className="grid gap-2 text-sm uppercase tracking-[0.22em] text-ivory/70">Service<select name="service" className="rounded-xl border border-white/10 bg-black p-4 text-ivory">{services.map((service) => <option key={service.slug} value={service.slug}>{service.name} — {service.price ? `$${service.price}` : "Custom"}</option>)}</select></label>
          <label className="grid gap-2 text-sm uppercase tracking-[0.22em] text-ivory/70">Package<select name="packageName" className="rounded-xl border border-white/10 bg-black p-4 text-ivory"><option>Signature</option><option>Editorial Plus</option><option>Full Production</option><option>Custom Scope</option></select></label>
          <div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm uppercase tracking-[0.22em] text-ivory/70">Date<input name="date" type="date" required className="rounded-xl border border-white/10 bg-black p-4 text-ivory" /></label><label className="grid gap-2 text-sm uppercase tracking-[0.22em] text-ivory/70">Time<select name="time" className="rounded-xl border border-white/10 bg-black p-4 text-ivory">{times.map((time) => <option key={time}>{time}</option>)}</select></label></div>
          <div className="grid gap-5 md:grid-cols-2"><input name="name" required placeholder="Full name" className="rounded-xl border border-white/10 bg-black p-4 text-ivory" /><input name="email" type="email" required placeholder="Email" className="rounded-xl border border-white/10 bg-black p-4 text-ivory" /></div>
          <textarea name="notes" placeholder="Tell us about the vision" rows={5} className="rounded-xl border border-white/10 bg-black p-4 text-ivory" />
          <button className="rounded-full bg-ivory px-6 py-4 text-sm font-bold uppercase tracking-[0.24em] text-obsidian transition hover:bg-champagne">Submit booking & pay deposit</button>
        </form>
      </div>
    </main>
  );
}
