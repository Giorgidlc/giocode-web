import type { Metadata } from "next";
import  HeyWow  from "next/font/local";
import "./globals.css";

const heyWow = HeyWow({
  src: [
    {
      path: '../public/font/HeyWow-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/HeyWow-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
});
  

export const metadata: Metadata = {
  title: "Giocode",
  description: "Generamos soluciones digitales a medida para tu negocio.",
  
  // Iconos
  icons: {
    icon: "/favicon.ico", // Ruta relativa a la carpeta public
    apple: "/apple-icon.png",
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Giocode | Soluciones Digitales",
    description: "Desarrollamos software a medida para potenciar tu negocio.",
    url: "https://giocode.dev",
    siteName: "Giocode",
    images: [
      {
        url: "/imagotipo-white-giocode.png", // Imagen de 1200x630
        width: 1200,
        height: 630,
        alt: "Giocode - Soluciones Digitales",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Giocode",
    description: "Generamos soluciones digitales a medida.",
    images: ["/imagotipo-white-giocode.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${heyWow.className} `}>
        {children}
      </body>
    </html>
  );
}
