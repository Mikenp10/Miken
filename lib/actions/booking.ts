"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { services } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

const bookingSchema = z.object({
  service: z.string().min(1),
  packageName: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  notes: z.string().optional()
});

export async function submitBooking(formData: FormData) {
  const parsed = bookingSchema.parse({
    service: formData.get("service"),
    packageName: formData.get("packageName"),
    date: formData.get("date"),
    time: formData.get("time"),
    name: formData.get("name"),
    email: formData.get("email"),
    notes: formData.get("notes")
  });
  const selected = services.find((service) => service.slug === parsed.service) ?? services[0];
  const supabase = await createSupabaseServerClient();

  let bookingId = crypto.randomUUID();
  if (supabase) {
    const { data: userData } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("bookings")
      .insert({
        client_id: userData.user?.id,
        service_slug: parsed.service,
        package_name: parsed.packageName,
        date: parsed.date,
        time: parsed.time,
        contact_name: parsed.name,
        contact_email: parsed.email,
        notes: parsed.notes,
        status: "pending",
        payment_status: selected.deposit > 0 ? "unpaid" : "paid",
        deposit_amount: selected.deposit,
        total_amount: selected.price
      })
      .select("id")
      .single();
    bookingId = data?.id ?? bookingId;
  }

  if (selected.deposit > 0) {
    const stripe = getStripe();
    if (stripe) {
      const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: parsed.email,
        line_items: [{ price_data: { currency: "usd", unit_amount: selected.deposit * 100, product_data: { name: `${selected.name} deposit` } }, quantity: 1 }],
        metadata: { bookingId, paymentType: "deposit" },
        success_url: `${origin}/dashboard/client?booking=${bookingId}&payment=success`,
        cancel_url: `${origin}/booking?payment=cancelled`
      });
      if (session.url) redirect(session.url);
    }
  }

  redirect(`/dashboard/client?booking=${bookingId}`);
}

export async function updateBookingStatus(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (supabase) await supabase.from("bookings").update({ status }).eq("id", id);
  redirect("/dashboard/admin");
}
