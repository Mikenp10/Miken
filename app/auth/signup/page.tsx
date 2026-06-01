import Link from "next/link";
import { signUpWithPassword } from "@/lib/actions/auth";

export default function SignupPage() {
  return <main className="flex min-h-screen items-center justify-center px-4 pt-24"><div className="w-full max-w-md luxury-border rounded-[2rem] bg-white/[0.03] p-8"><h1 className="font-display text-5xl">Create account</h1><p className="mt-3 text-ivory/65">Secure client access for booking history and private gallery delivery.</p><form action={signUpWithPassword} className="mt-8 grid gap-4"><input name="full_name" required placeholder="Full name" className="rounded-xl border border-white/10 bg-black p-4" /><input name="email" type="email" required placeholder="Email" className="rounded-xl border border-white/10 bg-black p-4" /><input name="password" type="password" required placeholder="Password" className="rounded-xl border border-white/10 bg-black p-4" /><button className="rounded-full bg-ivory px-6 py-4 font-bold uppercase tracking-[0.22em] text-obsidian">Create account</button></form><p className="mt-6 text-sm text-ivory/65">Already have access? <Link href="/auth/login" className="text-champagne">Login</Link></p></div></main>;
}
