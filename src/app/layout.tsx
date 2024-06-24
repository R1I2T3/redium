"use client";
import "./globals.css";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/lib/atom";
import { JotaiProvider } from "@/components/JotaiProvider";
import { Toaster } from "react-hot-toast";

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
