"use client";

import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { mockProducts, mockMediaAssets } from "@/lib/mock-data";

export default function ProductsPage() {
  const t = useTranslations("home");

  const publishedProducts = mockProducts.filter((p) => p.is_published);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-semibold mb-8">
        {t("featuredProducts")}
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {publishedProducts.map((product) => {
          const thumbnail = mockMediaAssets.find(
            (m) => m.product_id === product.id && m.type === "photo_gallery"
          );
          return (
            <ProductCard
              key={product.id}
              product={product}
              thumbnail={thumbnail}
            />
          );
        })}
      </div>
    </div>
  );
}
