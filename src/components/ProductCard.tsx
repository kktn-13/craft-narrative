"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { Product, MediaAsset } from "@/lib/types";
import { getLocalizedField } from "@/lib/i18n-helpers";

type Props = {
  product: Product;
  thumbnail?: MediaAsset;
};

export default function ProductCard({ product, thumbnail }: Props) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group block bg-white border border-parchment-300 rounded overflow-hidden hover:shadow-gold-glow hover:border-gold-400 transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-parchment-100 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail.thumbnail_url || thumbnail.url}
            alt={getLocalizedField(product.name, locale)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-parchment-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <p className="text-xs text-gold-600 font-medium tracking-widest uppercase mb-1">
          {getLocalizedField(product.origin_region, locale)}
        </p>
        <h3 className="font-serif text-lg font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
          {getLocalizedField(product.name, locale)}
        </h3>
        <p className="text-sm text-ink-500 mt-1 line-clamp-2">
          {getLocalizedField(product.description, locale)}
        </p>
        <div className="mt-3 flex items-center gap-1">
          <span className="block w-8 h-0.5 bg-gold-400 group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}
