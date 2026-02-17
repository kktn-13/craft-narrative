"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 bg-craft-100 rounded-full p-0.5">
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-craft-700 text-white"
            : "text-craft-700 hover:bg-craft-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("ja")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          locale === "ja"
            ? "bg-craft-700 text-white"
            : "text-craft-700 hover:bg-craft-200"
        }`}
      >
        JA
      </button>
    </div>
  );
}
