import { NextResponse } from "next/server";

const templates = {
  booking_submitted: "Your MLPVisuals booking request has been received and is pending studio approval.",
  booking_approved: "Your MLPVisuals booking is approved. We are ready to create with you.",
  gallery_available: "Your private MLPVisuals gallery is now available in your client portal.",
  payment_received: "Payment received. Your receipt and booking details are saved in your dashboard."
};

export async function GET() {
  return NextResponse.json({ provider: "Connect Resend, Postmark, or Supabase Edge Functions in production.", templates });
}
