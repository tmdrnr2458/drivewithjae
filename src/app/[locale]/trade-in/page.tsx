import { setRequestLocale } from "next-intl/server";
import { TradeInForm } from "@/components/TradeInForm";

export default async function TradeInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TradeInForm />;
}
