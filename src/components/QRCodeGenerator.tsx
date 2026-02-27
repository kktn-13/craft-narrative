"use client";

import { useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslations } from "next-intl";

type Props = {
  productSlug: string;
  locale: string;
};

export default function QRCodeGenerator({ productSlug, locale }: Props) {
  const t = useTranslations("dashboard");
  const canvasRef = useRef<HTMLDivElement>(null);

  const storyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/products/${productSlug}/story`
      : `/${locale}/products/${productSlug}/story`;

  const downloadQR = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qr-${productSlug}.png`;
    link.href = url;
    link.click();
  }, [productSlug]);

  return (
    <div className="bg-white border border-parchment-300 rounded p-6">
      <h4 className="font-medium text-navy-800 mb-2">{t("qrCode")}</h4>
      <p className="text-sm text-ink-500 mb-4">{t("qrDesc")}</p>
      <div ref={canvasRef} className="flex justify-center mb-4">
        <QRCodeCanvas
          value={storyUrl}
          size={200}
          bgColor="#f8f4ec"
          fgColor="#0f1f3d"
          level="M"
        />
      </div>
      <p className="text-xs text-ink-400 text-center mb-3 break-all">{storyUrl}</p>
      <button
        onClick={downloadQR}
        className="w-full py-2 text-sm bg-gold-500 text-navy-950 font-semibold rounded hover:bg-gold-400 transition-colors"
      >
        {t("downloadQR")}
      </button>
    </div>
  );
}
