export type UserRole = "admin" | "client";
export type BookingStatus = "pending" | "approved" | "declined" | "rescheduled" | "completed";
export type PaymentStatus = "unpaid" | "deposit_paid" | "paid" | "refunded";

export type Booking = {
  id: string;
  client_id: string;
  service_slug: string;
  package_name: string;
  date: string;
  time: string;
  contact_name: string;
  contact_email: string;
  notes?: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  deposit_amount: number;
  total_amount: number;
};

export type Gallery = {
  id: string;
  title: string;
  client_id: string;
  cover_image_url?: string;
  is_published: boolean;
  created_at: string;
};

export type GalleryAsset = {
  id: string;
  gallery_id: string;
  storage_path: string;
  public_url: string;
  media_type: "photo" | "video";
  is_approved: boolean;
  downloads_count: number;
};
