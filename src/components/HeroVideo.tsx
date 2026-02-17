"use client";

import { useTranslations } from "next-intl";

type Props = {
  videoUrl: string;
  thumbnailUrl?: string;
};

export default function HeroVideo({ videoUrl, thumbnailUrl }: Props) {
  const t = useTranslations("product");

  return (
    <div className="relative w-full aspect-video bg-ink-950 rounded-lg overflow-hidden">
      <video
        src={videoUrl}
        poster={thumbnailUrl || undefined}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
        <p className="text-white/80 text-sm font-medium">{t("heroVideo")}</p>
      </div>
    </div>
  );
}
