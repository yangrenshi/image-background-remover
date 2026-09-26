import { Manrope, Newsreader } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Image Background Remover — Free Online Transparent PNG Tool",
  description:
    "Free image background remover. Upload a JPG or PNG, remove the background in seconds, and download a transparent PNG. No signup, no watermark, no image storage.",
  keywords: [
    "image background remover",
    "remove background",
    "transparent PNG",
    "background removal",
    "free background remover",
  ],
  openGraph: {
    title: "Image Background Remover — Free Online Transparent PNG Tool",
    description:
      "Remove image backgrounds online for free. Fast, private, no watermark.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-[var(--background)] font-sans text-slate-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
