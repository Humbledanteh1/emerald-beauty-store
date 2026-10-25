import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emerald — Beauty, thoughtfully chosen",
  description: "Discover your next skin, hair and beauty essentials at Emerald Beauty.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}