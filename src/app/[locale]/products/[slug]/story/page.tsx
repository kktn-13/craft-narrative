"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import HeroVideo from "@/components/HeroVideo";
import AudioPlayer from "@/components/AudioPlayer";
import { getProductBySlug, getMediaForProduct } from "@/lib/mock-data";
import { getLocalizedField } from "@/lib/i18n-helpers";

/**
 * Consumer-facing story page (no pricing shown).
 * This is the page that QR codes in retail stores link to.
 */
export default function ConsumerStoryPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("product");

  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500">Product not found</p>
      </div>
    );
  }

  const media = getMediaForProduct(product.id);
  const heroVideo = media.find((m) => m.type === "video_hero");
  const audio = media.find((m) => m.type === "podcast_audio");
  const photos = media.filter((m) => m.type === "photo_gallery");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Video */}
      {heroVideo && (
        <HeroVideo
          videoUrl={heroVideo.url}
          thumbnailUrl={heroVideo.thumbnail_url}
        />
      )}

      {/* Title & Origin */}
      <div className="mt-8 text-center">
        <p className="text-sm text-craft-500 mb-2">
          {getLocalizedField(product.origin_region, locale)}
        </p>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-ink-900">
          {getLocalizedField(product.name, locale)}
        </h1>
        <p className="mt-4 text-ink-600 leading-relaxed text-lg max-w-2xl mx-auto">
          {getLocalizedField(product.description, locale)}
        </p>
      </div>

      {/* Audio */}
      {audio && (
        <div className="mt-8 max-w-xl mx-auto">
          <AudioPlayer audioUrl={audio.url} />
        </div>
      )}

      {/* Story */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4 text-center">
          {t("consumerStoryTitle")}
        </h2>
        <div className="prose-craft max-w-2xl mx-auto">
          {getLocalizedField(product.story_text, locale)
            .split("\n")
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4 text-center">
          {t("processDetails")}
        </h2>
        <div className="prose-craft max-w-2xl mx-auto bg-white border border-craft-200 rounded-lg p-6">
          {getLocalizedField(product.process_details, locale)
            .split("\n")
            .map((step, i) => (
              <p key={i}>{step}</p>
            ))}
        </div>
      </section>

      {/* Photos */}
      {photos.length > 0 && (
        <section className="mt-12">
          <div className="grid grid-cols-2 gap-4">
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

      {/* Powered by CraftNarrative */}
      <div className="mt-16 text-center text-sm text-ink-400">
        <p>Powered by CraftNarrative</p>
      </div>
    </div>
  );
}
