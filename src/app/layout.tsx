import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/dom/CustomCursor";
import SmoothScroll from "@/components/dom/SmoothScroll";
import Footer from "@/components/dom/Footer";
import ChatInterface from "@/components/dom/ChatInterface";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Adil Zaben - Creative Technologist",
  description: "Portfolio of Adil Zaben, CS Undergraduate & Creative Technologist.",
  keywords: ["Adil Zaben", "Portfolio", "Creative Technologist", "WebGL", "React Three Fiber", "Next.js"],
  openGraph: {
    title: "Adil Zaben - Creative Technologist",
    description: "Portfolio of Adil Zaben, CS Undergraduate & Creative Technologist.",
    type: "website",
    locale: "en_US",
    siteName: "Adil Zaben Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-white overflow-x-hidden cursor-none`}>
        <CustomCursor />
        <Scene />
        <SmoothScroll>
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <ChatInterface />
      </body>
    </html>
  );
}
