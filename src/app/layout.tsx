import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";
import PageLoader from "../components/PageLoader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AERTH | Premium Sportswear & Activewear",
  description: "Made for movement. Discover high-performance leggings, sports bras, and workout gear designed to elevate your form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-white text-zinc-900 overflow-x-hidden">
        <CartProvider>
          <SmoothScrollProvider>
            <PageLoader />
            {children}
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
