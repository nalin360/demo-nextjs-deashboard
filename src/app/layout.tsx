import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "@/src/components/MSWProvider";
import { Providers } from "@/src/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Market Dashboard",
  description: "Real-time market data visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <Providers>
          <MSWProvider>
            {children}
          </MSWProvider>
        </Providers>
      </body>
    </html>
  );
}
