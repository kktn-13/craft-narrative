"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import { getOrdersForBuyer } from "@/lib/mock-data";
import { getLocalizedField } from "@/lib/i18n-helpers";

export default function DashboardPage() {
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const ts = useTranslations("status");
  const tc = useTranslations("common");
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500">{tc("login")}</p>
      </div>
    );
  }

  const orders = getOrdersForBuyer(user.id);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(price);

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-blue-100 text-blue-800",
    shipping: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-semibold mb-2">{t("title")}</h1>
      <p className="text-ink-500 mb-8">{user.company_name}</p>

      <h2 className="font-serif text-xl font-medium mb-4">{t("myOrders")}</h2>

      {orders.length === 0 ? (
        <p className="text-ink-400">{t("noOrders")}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/${locale}/dashboard/orders/${order.id}`}
              className="block bg-white border border-craft-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-mono text-ink-400">
                  {order.id}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[order.status]}`}
                >
                  {ts(order.status)}
                </span>
              </div>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <p key={item.product_id} className="text-sm text-ink-600">
                    {getLocalizedField(item.product_name, locale)} x{" "}
                    {item.quantity}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold text-craft-800">
                  {formatPrice(order.total_amount)}
                </span>
                <span className="text-xs text-ink-400">
                  {new Date(order.created_at).toLocaleDateString(
                    locale === "ja" ? "ja-JP" : "en-US"
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
