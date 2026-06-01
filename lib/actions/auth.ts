"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signInWithPassword(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/auth/login?error=missing-supabase");

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard/client");
}

export async function signUpWithPassword(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/auth/signup?error=missing-supabase");

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fullName = String(formData.get("full_name"));
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role: "client" } }
  });
  if (error) redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard/client");
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/auth/login?error=missing-supabase");

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback` }
  });
  if (error || !data.url) redirect("/auth/login?error=google-auth");
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/");
}
