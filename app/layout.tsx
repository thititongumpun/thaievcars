import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThaiEVCars",
  description: "Thai-first EV reference for buyers and owners in Thailand"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return children;
}
