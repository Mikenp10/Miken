"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createGallery(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const title = String(formData.get("title"));
  const clientEmail = String(formData.get("client_email"));
  const cover = String(formData.get("cover_image_url"));

  if (supabase) {
    const { data: profile } = await supabase.from("profiles").select("id").eq("email", clientEmail).single();
    await supabase.from("galleries").insert({ title, client_id: profile?.id, cover_image_url: cover, is_published: false });
  }
  redirect("/dashboard/admin");
}

export async function favoriteAsset(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const assetId = String(formData.get("asset_id"));
  const galleryId = String(formData.get("gallery_id"));
  const selectedForEdit = formData.get("selected_for_edit") === "on";

  if (supabase) {
    const { data: userData } = await supabase.auth.getUser();
    await supabase.from("gallery_favorites").upsert({
      asset_id: assetId,
      gallery_id: galleryId,
      client_id: userData.user?.id,
      selected_for_edit: selectedForEdit
    });
  }
  revalidatePath(`/gallery/${galleryId}`);
}

export async function markDownload(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const assetId = String(formData.get("asset_id"));
  const url = String(formData.get("url"));
  if (supabase) {
    await supabase.rpc("increment_asset_download", { asset_uuid: assetId });
  }
  redirect(url);
}
