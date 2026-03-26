import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drive with Jae",
  description: "Find your perfect car with Seungkook Jae",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
