import { updateBookingStatus } from "@/lib/actions/booking";
import { createGallery } from "@/lib/actions/gallery";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminBooking = {
  id: string;
  contact_name: string;
  contact_email: string;
  service_slug: string;
  date: string;
  time: string;
  status: string;
  payment_status: string;
};

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: bookings } = supabase ? await supabase.from("bookings").select("*").order("created_at", { ascending: false }) : { data: null };
  const { data: favorites } = supabase ? await supabase.from("gallery_favorites").select("*, gallery_assets(*)") : { data: null };
  const rows: AdminBooking[] = bookings ?? [{ id: "demo", contact_name: "Demo Client", contact_email: "client@example.com", service_slug: "portrait", date: "2026-06-12", time: "14:00", status: "pending", payment_status: "unpaid" }];

  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm uppercase tracking-[0.4em] text-champagne">Admin dashboard</p><h1 className="mt-4 font-display text-6xl">Studio command center.</h1><div className="mt-10 grid gap-5 md:grid-cols-4">{[["Bookings", rows.length], ["Payments", "Track"], ["Favorites", favorites?.length ?? 0], ["Users", "Manage"]].map(([label, value]) => <div key={String(label)} className="luxury-border rounded-3xl bg-white/[0.03] p-6"><p className="text-sm uppercase tracking-[0.25em] text-ivory/55">{String(label)}</p><p className="mt-3 font-display text-4xl">{String(value)}</p></div>)}</div>
      <section className="mt-12 grid gap-8 xl:grid-cols-[1.3fr_0.7fr]"><div className="luxury-border rounded-[2rem] p-6"><h2 className="font-display text-4xl">All bookings</h2><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="text-xs uppercase tracking-[0.25em] text-champagne"><tr><th className="p-3">Client</th><th>Service</th><th>Date</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map((booking) => <tr key={booking.id} className="border-t border-white/10"><td className="p-3"><p>{booking.contact_name}</p><p className="text-sm text-ivory/50">{booking.contact_email}</p></td><td>{booking.service_slug}</td><td>{booking.date} {booking.time}</td><td>{booking.payment_status}</td><td>{booking.status}</td><td><form action={updateBookingStatus} className="flex gap-2"><input type="hidden" name="id" value={booking.id} /><select name="status" className="rounded-lg bg-black p-2"><option>approved</option><option>declined</option><option>rescheduled</option><option>completed</option></select><button className="rounded-lg bg-ivory px-3 text-obsidian">Save</button></form></td></tr>)}</tbody></table></div></div>
        <div className="luxury-border rounded-[2rem] p-6"><h2 className="font-display text-4xl">Create gallery</h2><form action={createGallery} className="mt-6 grid gap-4"><input name="title" required placeholder="Gallery title" className="rounded-xl border border-white/10 bg-black p-4" /><input name="client_email" required placeholder="Client email" className="rounded-xl border border-white/10 bg-black p-4" /><input name="cover_image_url" placeholder="Cover image URL" className="rounded-xl border border-white/10 bg-black p-4" /><button className="rounded-full bg-ivory px-6 py-4 font-bold uppercase tracking-[0.22em] text-obsidian">Create</button></form><p className="mt-6 text-sm text-ivory/55">Use Supabase Storage bucket uploads for hundreds of images and assign them through gallery_assets.</p></div></section>
      </div></main>
  );
}
