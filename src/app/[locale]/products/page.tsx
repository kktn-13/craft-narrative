"use client";

import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { mockProducts, mockMediaAssets } from "@/lib/mock-data";

export default function ProductsPage() {
  const t = useTranslations("home");

  const publishedProducts = mockProducts.filter((p) => p.is_published);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-gold-600 text-xs tracking-widest uppercase font-medium mb-2">Collection</p>
        <h1 className="font-serif text-3xl font-semibold text-navy-800">{t("featuredProducts")}</h1>
        <div className="w-12 h-0.5 bg-gold-400 mt-4" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {publishedProducts.map((product) => {
          const thumbnail = mockMediaAssets.find(
            (m) => m.product_id === product.id && m.type === "photo_gallery"
          );
          return <ProductCard key={product.id} product={product} thumbnail={thumbnail} />;
        })}
      </div>
    </div>
  );
}
