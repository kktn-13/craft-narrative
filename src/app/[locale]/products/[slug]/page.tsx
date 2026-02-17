"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import AudioPlayer from "@/components/AudioPlayer";
import { useAuth } from "@/lib/auth-context";
import { getProductBySlug, getMediaForProduct } from "@/lib/mock-data";
import { getLocalizedField } from "@/lib/i18n-helpers";

export default function ProductDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("product");
  const tc = useTranslations("common");
  const { isBuyer } = useAuth();

  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500">{tc("error")}</p>
      </div>
    );
  }

  const media = getMediaForProduct(product.id);
  const heroVideo = media.find((m) => m.type === "video_hero");
  const processVideo = media.find((m) => m.type === "video_process");
  const audio = media.find((m) => m.type === "podcast_audio");
  const photos = media.filter((m) => m.type === "photo_gallery");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href={`/${locale}/products`}
        className="inline-flex items-center text-sm text-craft-600 hover:text-craft-800 mb-6"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {tc("back")}
      </Link>

      {/* Hero Video */}
      {heroVideo && (
        <HeroVideo
          videoUrl={heroVideo.url}
          thumbnailUrl={heroVideo.thumbnail_url}
        />
      )}

      {/* Product Header */}
      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-sm text-craft-500 mb-1">
            {t("origin")}: {getLocalizedField(product.origin_region, locale)}
          </p>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-ink-900">
            {getLocalizedField(product.name, locale)}
          </h1>
          <p className="mt-4 text-ink-600 leading-relaxed text-lg">
            {getLocalizedField(product.description, locale)}
          </p>
        </div>

        {/* Pricing / Access Card */}
        <div className="bg-white border border-craft-200 rounded-lg p-6">
          {isBuyer ? (
            <>
              <p className="text-sm text-ink-400">{t("wholesalePrice")}</p>
              <p className="text-3xl font-bold text-craft-800 mt-1">
                {formatPrice(product.price_wholesale)}
              </p>
              <p className="text-sm text-ink-400 mt-2">
                {t("retailRef")}: {formatPrice(product.price_retail_ref)}
              </p>
              <p className="text-sm text-ink-400 mt-1">
                {t("moq")}: {product.moq} {t("units")}
              </p>
              <button className="mt-6 w-full py-3 bg-craft-700 text-white rounded-md hover:bg-craft-800 transition-colors font-medium">
                {t("addToCart")}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-ink-500 mb-4">{t("buyerOnly")}</p>
              <Link
                href={`/${locale}`}
                className="block w-full py-3 bg-craft-700 text-white rounded-md hover:bg-craft-800 transition-colors font-medium text-center"
              >
                {t("requestAccess")}
              </Link>
              <p className="text-xs text-ink-400 mt-3">
                {t("requestAccessDesc")}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Audio Player */}
      {audio && (
        <div className="mt-8">
          <AudioPlayer audioUrl={audio.url} />
        </div>
      )}

      {/* Story Section */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">
          {t("theStory")}
        </h2>
        <div className="prose-craft">
          {getLocalizedField(product.story_text, locale)
            .split("\n")
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      </section>

      {/* Process Details */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">
          {t("processDetails")}
        </h2>

        {processVideo && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <video
              src={processVideo.url}
              controls
              className="w-full aspect-video bg-ink-950"
            />
          </div>
        )}

        <div className="prose-craft bg-white border border-craft-200 rounded-lg p-6">
          {getLocalizedField(product.process_details, locale)
            .split("\n")
            .map((step, i) => (
              <p key={i}>{step}</p>
            ))}
        </div>
      </section>

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <section className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden bg-craft-100"
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
