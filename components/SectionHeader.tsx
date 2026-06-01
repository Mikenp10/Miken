export function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm uppercase tracking-[0.4em] text-champagne">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl text-balance text-ivory md:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-8 text-ivory/68">{children}</p>}
    </div>
  );
}
