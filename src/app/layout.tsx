"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/lib/atom";
import { JotaiProvider } from "@/components/JotaiProvider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useAtomValue(themeAtom);
  return (
    <JotaiProvider>
      <html lang="en" data-theme={theme}>
        <body className={`${inter.className} `}>{children}</body>
      </html>
    </JotaiProvider>
  );
}
