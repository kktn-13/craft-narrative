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
      className="group block bg-white border border-craft-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/3] bg-craft-100 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail.thumbnail_url || thumbnail.url}
            alt={getLocalizedField(product.name, locale)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-craft-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-craft-500 mb-1">
          {getLocalizedField(product.origin_region, locale)}
        </p>
        <h3 className="font-serif text-lg font-semibold text-ink-900 group-hover:text-craft-700 transition-colors">
          {getLocalizedField(product.name, locale)}
        </h3>
        <p className="text-sm text-ink-500 mt-1 line-clamp-2">
          {getLocalizedField(product.description, locale)}
        </p>
      </div>
    </Link>
  );
}
