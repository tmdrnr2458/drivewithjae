import { setRequestLocale } from "next-intl/server";
import { LifestyleQuiz } from "@/components/LifestyleQuiz";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LifestyleQuiz />;
}
