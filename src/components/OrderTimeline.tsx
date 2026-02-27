"use client";

import { useTranslations } from "next-intl";
import type { OrderStatus } from "@/lib/types";

type Props = {
  currentStatus: OrderStatus;
  trackingNumber?: string | null;
  carrier?: string | null;
};

const STATUSES: OrderStatus[] = ["pending", "paid", "shipping", "delivered"];

export default function OrderTimeline({ currentStatus, trackingNumber, carrier }: Props) {
  const t = useTranslations("status");
  const tDash = useTranslations("dashboard");

  const currentIndex = STATUSES.indexOf(currentStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        {STATUSES.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={status} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center w-full">
                {index > 0 && (
                  <div className={`absolute left-0 right-1/2 h-0.5 top-4 -translate-y-1/2 ${isCompleted ? "bg-gold-500" : "bg-parchment-300"}`} />
                )}
                {index < STATUSES.length - 1 && (
                  <div className={`absolute left-1/2 right-0 h-0.5 top-4 -translate-y-1/2 ${index < currentIndex ? "bg-gold-500" : "bg-parchment-300"}`} />
                )}
                <div className="relative mx-auto">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted ? "bg-gold-500 text-navy-950" : "bg-parchment-200 text-ink-400"
                  } ${isCurrent ? "ring-2 ring-gold-300 ring-offset-2" : ""}`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                </div>
              </div>
              <p className={`text-xs mt-2 ${isCurrent ? "font-semibold text-gold-600" : "text-ink-400"}`}>
                {t(status)}
              </p>
            </div>
          );
        })}
      </div>

      {(trackingNumber || carrier) && (
        <div className="bg-navy-50 border border-navy-200 rounded p-4">
          <h4 className="text-sm font-medium text-navy-800 mb-2">{tDash("trackingInfo")}</h4>
          {carrier && (
            <p className="text-sm text-ink-600">
              <span className="text-ink-400">{tDash("carrier")}:</span> {carrier}
            </p>
          )}
          {trackingNumber && (
            <p className="text-sm text-ink-600 mt-1">
              <span className="text-ink-400">{tDash("trackingNumber")}:</span>{" "}
              <code className="bg-white px-2 py-0.5 rounded text-gold-700">{trackingNumber}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
