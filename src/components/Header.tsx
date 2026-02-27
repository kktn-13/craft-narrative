"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const { user, login, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="border-b border-navy-800/20 bg-navy-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className="text-xl font-serif font-bold text-gold-400 tracking-widest uppercase"
            >
              {t("siteName")}
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href={`/${locale}`} className="text-sm text-parchment-200 hover:text-gold-400 transition-colors">
                {t("home")}
              </Link>
              <Link href={`/${locale}/products`} className="text-sm text-parchment-200 hover:text-gold-400 transition-colors">
                {t("products")}
              </Link>
              {isAuthenticated && (
                <Link href={`/${locale}/dashboard`} className="text-sm text-parchment-200 hover:text-gold-400 transition-colors">
                  {t("dashboard")}
                </Link>
              )}
              {isAdmin && (
                <Link href={`/${locale}/admin/orders`} className="text-sm text-parchment-200 hover:text-gold-400 transition-colors">
                  {t("admin")}
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-parchment-300">{user?.company_name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-parchment-300 hover:text-gold-400 transition-colors"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => login("buyer")}
                  className="text-sm px-3 py-1.5 bg-gold-500 text-navy-950 font-semibold rounded hover:bg-gold-400 transition-colors"
                >
                  {t("login")} (Buyer)
                </button>
                <button
                  onClick={() => login("admin")}
                  className="text-sm px-3 py-1.5 border border-gold-500/50 text-gold-400 rounded hover:bg-navy-700 transition-colors"
                >
                  {t("login")} (Admin)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
