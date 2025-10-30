import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Soaking in Bliss with Gurudev Sri Sri Ravi Shankar | 22nd Nov 2025 | Chandigarh",
  description: "Join us for an evening of meditation, music and wisdom with Gurudev Sri Sri Ravi Shankar at Chandigarh on 22nd November 2025. Book your tickets now!",
  icons: {
    icon: 'https://www.artofliving.org/sites/all/themes/aol-zen/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dancingScript.variable} antialiased`}
      >
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
