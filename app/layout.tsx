import type { Metadata } from "next";
import { Contrail_One } from "next/font/google";

import { BackButton } from "@/components/elements";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/layout/footer";
import { MainOutlet } from "@/layout/main-outlet";
import { Providers } from "@/providers";

import "./globals.css";

const contrailOne = Contrail_One({
  variable: "--font-contrial-one",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TODOS",
  description: "TODOS",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "TODOS",
    type: "website",
    url: "ttps://1732-todo-app-nextjs.netlify.app/",
    description: "TODOS",
    images: [
      {
        url: "https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/00a07e5ad65f27b4fa4d8a8c672c32ba214e54e4-512x512.png",
        width: 1200,
        height: 630,
        alt: "TODOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TODOS",
    description: "TODOS",
    images: [
      "https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/00a07e5ad65f27b4fa4d8a8c672c32ba214e54e4-512x512.png",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${contrailOne.variable} antialiased`}>
        <Providers>
          <BackButton />
          <MainOutlet>{children}</MainOutlet>
          <Footer />
        </Providers>
        <Toaster closeButton />
      </body>
    </html>
  );
}
