"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import OrderTimeline from "@/components/OrderTimeline";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { getOrderById, getMediaForProduct } from "@/lib/mock-data";
import { getLocalizedField } from "@/lib/i18n-helpers";

export default function OrderDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");
  const { isAuthenticated } = useAuth();

  const orderId = params.id as string;
  const order = getOrderById(orderId);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500">{tc("login")}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500">{tc("error")}</p>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href={`/${locale}/dashboard`}
        className="inline-flex items-center text-sm text-craft-600 hover:text-craft-800 mb-6"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {tc("back")}
      </Link>

      <h1 className="font-serif text-3xl font-semibold mb-2">
        {t("orderDetail")}
      </h1>
      <p className="text-sm text-ink-400 font-mono mb-8">{order.id}</p>

      {/* Order Timeline */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-4">
          {t("orderStatus")}
        </h2>
        <OrderTimeline
          currentStatus={order.status}
          trackingNumber={order.tracking_number}
          carrier={order.carrier}
        />
      </section>

      {/* Order Items */}
      <section className="mb-10">
        <div className="bg-white border border-craft-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              {order.items.map((item) => (
                <tr key={item.product_id} className="border-b border-craft-100 last:border-0">
                  <td className="px-6 py-4">
                    <Link
                      href={`/${locale}/products/${item.product_slug}`}
                      className="text-craft-700 hover:text-craft-900 font-medium"
                    >
                      {getLocalizedField(item.product_name, locale)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-ink-500">
                    x {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {formatPrice(item.unit_price * item.quantity)}
                  </td>
                </tr>
              ))}
              <tr className="bg-craft-50">
                <td colSpan={2} className="px-6 py-4 font-semibold">
                  Total
                </td>
                <td className="px-6 py-4 text-right font-bold text-lg text-craft-800">
                  {formatPrice(order.total_amount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Shipping Address */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-medium mb-4">
          {t("shippingAddress")}
        </h2>
        <div className="bg-white border border-craft-200 rounded-lg p-6 text-sm text-ink-600">
          <p>{order.shipping_address.line1}</p>
          {order.shipping_address.line2 && (
            <p>{order.shipping_address.line2}</p>
          )}
          <p>
            {order.shipping_address.city}
            {order.shipping_address.state
              ? `, ${order.shipping_address.state}`
              : ""}{" "}
            {order.shipping_address.postal_code}
          </p>
          <p>{order.shipping_address.country}</p>
        </div>
      </section>

      {/* Retail Enablement Kit */}
      <section>
        <h2 className="font-serif text-xl font-medium mb-2">
          {t("retailKit")}
        </h2>
        <p className="text-sm text-ink-500 mb-6">{t("retailKitDesc")}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Downloadable Assets */}
          <div className="bg-white border border-craft-200 rounded-lg p-6">
            <h3 className="font-medium text-ink-800 mb-4">{t("assets")}</h3>
            <div className="space-y-3">
              {order.items.map((item) => {
                const media = getMediaForProduct(item.product_id);
                const downloadableAssets = media.filter(
                  (m) => m.is_public_asset
                );
                return (
                  <div key={item.product_id}>
                    <p className="text-sm font-medium text-ink-700 mb-2">
                      {getLocalizedField(item.product_name, locale)}
                    </p>
                    <div className="space-y-1">
                      {downloadableAssets.map((asset) => (
                        <a
                          key={asset.id}
                          href={asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-craft-600 hover:text-craft-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {asset.type.replace("_", " ")}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 w-full py-2 text-sm border border-craft-300 text-craft-700 rounded-md hover:bg-craft-50 transition-colors">
              {tc("downloadAll")}
            </button>
          </div>

          {/* QR Codes */}
          <div className="space-y-6">
            {order.items.map((item) => (
              <QRCodeGenerator
                key={item.product_id}
                productSlug={item.product_slug}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
