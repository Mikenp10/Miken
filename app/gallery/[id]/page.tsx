import Image from "next/image";
import { Download, Heart } from "lucide-react";
import { favoriteAsset, markDownload } from "@/lib/actions/gallery";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { portfolioItems } from "@/lib/site";

type GalleryAssetRow = {
  id: string;
  gallery_id: string;
  public_url: string;
  is_approved: boolean;
  downloads_count: number;
};

export default async function GalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: gallery } = supabase ? await supabase.from("galleries").select("*").eq("id", id).single() : { data: null };
  const { data: assets } = supabase ? await supabase.from("gallery_assets").select("*").eq("gallery_id", id).order("created_at") : { data: null };
  const demoAssets: GalleryAssetRow[] = portfolioItems.map((item, index) => ({ id: `${id}-${index}`, gallery_id: id, public_url: item.image, is_approved: index < 3, downloads_count: 0 }));
  const galleryAssets: GalleryAssetRow[] = assets?.length ? assets : demoAssets;

  return (
    <main className="px-4 pb-24 pt-36 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm uppercase tracking-[0.4em] text-champagne">Private gallery</p><h1 className="mt-4 font-display text-6xl">{gallery?.title ?? "Editorial Portrait Preview"}</h1><p className="mt-5 max-w-2xl text-ivory/65">Mark favorites, select files for editing, and download final approved images. Admins can review selections and download activity.</p><div className="masonry mt-12">{galleryAssets.map((asset) => <article key={asset.id} className="masonry-item overflow-hidden rounded-[1.5rem] bg-white/[0.04]"><Image src={asset.public_url} alt="Gallery asset" width={900} height={1100} className="w-full object-cover" /><div className="flex flex-wrap items-center justify-between gap-3 p-4"><form action={favoriteAsset} className="flex items-center gap-3"><input type="hidden" name="asset_id" value={asset.id} /><input type="hidden" name="gallery_id" value={id} /><label className="flex items-center gap-2 text-sm text-ivory/70"><input type="checkbox" name="selected_for_edit" /> Select for edit</label><button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm"><Heart className="h-4 w-4 text-champagne" /> Favorite</button></form>{asset.is_approved && <form action={markDownload}><input type="hidden" name="asset_id" value={asset.id} /><input type="hidden" name="url" value={asset.public_url} /><button className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm text-obsidian"><Download className="h-4 w-4" /> Download</button></form>}</div></article>)}</div></div></main>
  );
}
