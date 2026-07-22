import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";
import PageLoader from "../components/PageLoader";
import AuthModal from "../components/AuthModal";
import WhatsAppButton from "../components/WhatsAppButton";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-zinc-900 overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <SmoothScrollProvider>
              <PageLoader />
              <AuthModal />
              <WhatsAppButton />
              {children}
            </SmoothScrollProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
