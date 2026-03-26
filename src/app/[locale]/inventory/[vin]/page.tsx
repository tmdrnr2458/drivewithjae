import { setRequestLocale } from "next-intl/server";
import { VehicleDetail } from "@/components/VehicleDetail";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; vin: string }>;
}) {
  const { locale, vin } = await params;
  setRequestLocale(locale);
  return <VehicleDetail vin={vin} />;
}
