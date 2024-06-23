"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/lib/atom";
import { JotaiProvider } from "@/components/JotaiProvider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useAtomValue(themeAtom);
  return (
    <html lang="en" data-theme={theme}>
      <body>
        <JotaiProvider>
          <Toaster position="bottom-right" />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
