import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/languageProvider";
import LanguageToggle from "./components/LanguageToggle";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-ibm-plex-sans-kr",
  subsets: ["latin"],
  weight: ["100", "200", "300"],
});

export const metadata: Metadata = {
  title: "Dami Kang — Portfolio",
  description: "Full-Stack Developer & UI Craftsperson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSansKr.variable} antialiased`}
      >
       <Analytics />
        <LanguageProvider>
          <header className="fixed top-5 right-6 z-50 flex flex-row gap-2">
          
            <LanguageToggle />
          </header>

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
