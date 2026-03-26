import { setRequestLocale } from "next-intl/server";
import { LiveInventoryBrowser } from "@/components/LiveInventoryBrowser";

export default async function InventoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LiveInventoryBrowser />;
}
