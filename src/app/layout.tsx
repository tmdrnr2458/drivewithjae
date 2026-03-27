import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jae Method",
  description: "Find your perfect car with Seungkook Jae",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
