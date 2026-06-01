import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    if (bookingId && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      await supabase.from("payments").insert({ booking_id: bookingId, stripe_session_id: session.id, amount: session.amount_total ?? 0, status: "paid", stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id, receipt_url: null });
      await supabase.from("bookings").update({ payment_status: session.metadata?.paymentType === "deposit" ? "deposit_paid" : "paid" }).eq("id", bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
