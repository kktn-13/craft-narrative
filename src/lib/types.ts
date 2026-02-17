export type LocalizedText = {
  en: string;
  ja: string;
};

export type UserRole = "admin" | "buyer" | "creator";

export type Profile = {
  id: string;
  role: UserRole;
  company_name: string;
  country: string;
  preferred_language: "en" | "ja";
  created_at: string;
};

export type Product = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  story_text: LocalizedText;
  process_details: LocalizedText;
  price_wholesale: number;
  price_retail_ref: number;
  moq: number;
  origin_region: LocalizedText;
  is_published: boolean;
  created_at: string;
};

export type MediaType =
  | "video_hero"
  | "video_process"
  | "podcast_audio"
  | "photo_gallery";

export type MediaAsset = {
  id: string;
  product_id: string;
  type: MediaType;
  url: string;
  thumbnail_url: string;
  is_public_asset: boolean;
  creator_credit_id: string | null;
};

export type OrderStatus = "pending" | "paid" | "shipping" | "delivered";

export type Order = {
  id: string;
  buyer_id: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  tracking_number: string | null;
  carrier: string | null;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  created_at: string;
};

export type OrderItem = {
  product_id: string;
  product_slug: string;
  product_name: LocalizedText;
  quantity: number;
  unit_price: number;
};

export type QRScan = {
  id: string;
  product_id: string;
  scanned_at: string;
  location_country: string;
};
