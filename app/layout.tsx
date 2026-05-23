import type {Metadata} from "next";
import "./globals.css";
import {defaultSeo, getSiteUrl} from "@/lib/seo";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "ThaiEVCars",
    template: "%s | ThaiEVCars"
  },
  description: defaultSeo.th.description,
  applicationName: "ThaiEVCars",
  keywords: [
    "EV Thailand",
    "รถ EV",
    "รถไฟฟ้า",
    "รถยนต์ไฟฟ้า",
    "BYD Thailand",
    "Tesla Thailand",
    "MG EV",
    "เปรียบเทียบรถ EV"
  ],
  authors: [{name: "ThaiEVCars"}],
  creator: "ThaiEVCars",
  publisher: "ThaiEVCars",
  formatDetection: {
    telephone: false,
    address: false,
    email: false
  },
  icons: {
    icon: [
      {url: "/favicon.ico", sizes: "32x32"},
      {url: "/icon.svg", type: "image/svg+xml"}
    ],
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="th" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
