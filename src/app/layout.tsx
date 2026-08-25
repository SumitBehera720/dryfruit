import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";
import PageLoader from "../components/PageLoader";
import AuthModal from "../components/AuthModal";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Organic Traditions | 100% Certified Organic Superfoods & Dry Fruits",
  description: "Nourish your body with raw almonds, jumbo cashews, ashwagandha, maca, Medjool dates, and functional lattes.",
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
