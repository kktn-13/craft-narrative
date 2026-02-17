"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import OrderTimeline from "@/components/OrderTimeline";
import { mockOrders } from "@/lib/mock-data";
import { getLocalizedField } from "@/lib/i18n-helpers";
import type { OrderStatus } from "@/lib/types";

export default function AdminOrdersPage() {
  const locale = useLocale();
  const t = useTranslations("admin");
  const ts = useTranslations("status");
  const tc = useTranslations("common");
  const { isAdmin } = useAuth();

  const [orders, setOrders] = useState(mockOrders);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState<OrderStatus>("pending");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-500">{tc("login")} (Admin)</p>
      </div>
    );
  }

  const startEdit = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    setEditingId(orderId);
    setCarrier(order.carrier || "");
    setTrackingNumber(order.tracking_number || "");
    setStatus(order.status);
    setSuccessMsg("");
  };

  const saveEdit = () => {
    if (!editingId) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === editingId
          ? { ...o, carrier, tracking_number: trackingNumber, status }
          : o
      )
    );
    setSuccessMsg(t("updated"));
    setEditingId(null);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-semibold mb-2">{t("title")}</h1>
      <h2 className="text-ink-500 mb-8">{t("manageOrders")}</h2>

      {successMsg && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
          {successMsg}
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-craft-200 rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-mono text-ink-400">
                    {order.id}
                  </span>
                  <span className="ml-3 text-sm text-ink-500">
                    Buyer: {order.buyer_id}
                  </span>
                </div>
                <span className="text-lg font-semibold text-craft-800">
                  {formatPrice(order.total_amount)}
                </span>
              </div>

              {/* Items */}
              <div className="mb-4 text-sm text-ink-600">
                {order.items.map((item) => (
                  <span key={item.product_id} className="mr-4">
                    {getLocalizedField(item.product_name, locale)} x{" "}
                    {item.quantity}
                  </span>
                ))}
              </div>

              {/* Timeline */}
              <OrderTimeline
                currentStatus={order.status}
                trackingNumber={order.tracking_number}
                carrier={order.carrier}
              />

              {/* Edit Section */}
              {editingId === order.id ? (
                <div className="mt-6 bg-craft-50 border border-craft-200 rounded-lg p-4">
                  <h3 className="font-medium text-ink-700 mb-4">
                    {t("updateShipping")}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-ink-500 mb-1">
                        {t("carrierLabel")}
                      </label>
                      <input
                        type="text"
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                        placeholder="Japan Post EMS"
                        className="w-full px-3 py-2 border border-craft-200 rounded-md text-sm focus:ring-2 focus:ring-craft-300 focus:border-craft-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-ink-500 mb-1">
                        {t("trackingLabel")}
                      </label>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="JP123456789"
                        className="w-full px-3 py-2 border border-craft-200 rounded-md text-sm focus:ring-2 focus:ring-craft-300 focus:border-craft-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-ink-500 mb-1">
                        {t("statusLabel")}
                      </label>
                      <select
                        value={status}
                        onChange={(e) =>
                          setStatus(e.target.value as OrderStatus)
                        }
                        className="w-full px-3 py-2 border border-craft-200 rounded-md text-sm focus:ring-2 focus:ring-craft-300 focus:border-craft-400 outline-none"
                      >
                        <option value="pending">{ts("pending")}</option>
                        <option value="paid">{ts("paid")}</option>
                        <option value="shipping">{ts("shipping")}</option>
                        <option value="delivered">{ts("delivered")}</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 text-sm bg-craft-700 text-white rounded-md hover:bg-craft-800 transition-colors"
                    >
                      {t("update")}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 text-sm border border-craft-300 text-craft-700 rounded-md hover:bg-craft-50 transition-colors"
                    >
                      {tc("cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => startEdit(order.id)}
                  className="mt-4 px-4 py-2 text-sm border border-craft-300 text-craft-700 rounded-md hover:bg-craft-50 transition-colors"
                >
                  {t("updateShipping")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
