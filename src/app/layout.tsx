import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "UEDS - Unidad Extractora de Sacarosa",
    template: "%s | UEDS",
  },
  description: "Demostración interactiva de extracción de caña y sistema de recompensas para eventos y ferias.",
  keywords: ["UEDS", "Caña de Azúcar", "Recompensas", "Feria", "Extracción", "Sacarosa"],
  authors: [{ name: "UEDS Team" }],
  creator: "UEDS Team",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://ueds-antigravity.vercel.app/",
    title: "UEDS - Unidad Extractora de Sacarosa",
    description: "Demostración interactiva de extracción de caña y sistema de recompensas para eventos y ferias.",
    siteName: "UEDS",
    images: [
      {
        url: "/brand/logo.jpeg",
        width: 800,
        height: 600,
        alt: "UEDS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UEDS - Unidad Extractora de Sacarosa",
    description: "Demostración interactiva de extracción de caña y sistema de recompensas.",
    images: ["/brand/logo.jpeg"],
  },
  icons: {
    icon: "/brand/logo.jpeg",
    shortcut: "/brand/logo.jpeg",
    apple: "/brand/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
