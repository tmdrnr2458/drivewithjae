import { setRequestLocale } from "next-intl/server";
import { LiveInventoryBrowser } from "@/components/LiveInventoryBrowser";

export default async function UsedInventoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LiveInventoryBrowser defaultType="used" />;
}
