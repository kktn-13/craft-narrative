"use client";

import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { mockProducts, mockMediaAssets } from "@/lib/mock-data";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  const publishedProducts = mockProducts.filter((p) => p.is_published);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600')] bg-cover bg-center opacity-20" />
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-500" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-40">
          <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">
            Kairo
          </p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold max-w-3xl leading-tight text-white">
            {t("heroTitle")}
          </h1>
          <div className="w-16 h-0.5 bg-gold-500 mt-6 mb-6" />
          <p className="text-lg text-parchment-300 max-w-2xl">
            {t("heroSubtitle")}
          </p>
          <a
            href={`/${locale}/products`}
            className="inline-block mt-8 px-7 py-3 bg-gold-500 text-navy-950 font-semibold rounded hover:bg-gold-400 transition-colors"
          >
            {t("viewAll")}
          </a>
        </div>
      </section>

      {/* Why Kairo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-gold-600 text-xs tracking-widest uppercase font-medium mb-2">Our Mission</p>
          <h2 className="font-serif text-3xl font-semibold text-navy-800">
            {t("whyTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "story", text: t("whyStory") },
            { icon: "retail", text: t("whyRetail") },
            { icon: "global", text: t("whyGlobal") },
          ].map((item) => (
            <div
              key={item.icon}
              className="bg-white border border-parchment-300 rounded p-6 hover:border-gold-300 transition-colors"
            >
              <div className="w-12 h-12 bg-navy-800 rounded flex items-center justify-center mb-4">
                {item.icon === "story" && (
                  <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
                {item.icon === "retail" && (
                  <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                )}
                {item.icon === "global" && (
                  <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-ink-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white border-t border-parchment-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-xs tracking-widest uppercase font-medium mb-2">Collection</p>
            <h2 className="font-serif text-3xl font-semibold text-navy-800">
              {t("featuredProducts")}
            </h2>
            <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishedProducts.map((product) => {
              const thumbnail = mockMediaAssets.find(
                (m) => m.product_id === product.id && m.type === "photo_gallery"
              );
              return (
                <ProductCard key={product.id} product={product} thumbnail={thumbnail} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
