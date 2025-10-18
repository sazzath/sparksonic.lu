import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sparksonic Luxembourg | Electrical Services, Solar Panels, EV Chargers",
  description: "Luxembourg's premier electrical services provider. Professional solar panel installation, EV chargers, heat pumps, energy audits, and electrical services. 5.0 Google Rating.",
  keywords: "electrician Luxembourg, solar panels Luxembourg, EV charger installation, heat pumps, energy audit, electrical services, Sparksonic",
  openGraph: {
    title: "Sparksonic Luxembourg | Electrical & Energy Services",
    description: "Professional electrical services across Luxembourg - Solar Panels, EV Chargers, Heat Pumps & More",
    url: "https://sparksonic.lu",
    siteName: "Sparksonic",
    locale: "en_LU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}