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
