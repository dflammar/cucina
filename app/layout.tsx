import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cucina Plus | Premium Kitchens & Interiors — Baghdad",
  description:
    "Cucina Plus specialises in designing and installing premium European-inspired kitchens and interior spaces. Founded 2018, Baghdad, Iraq. Two showrooms: Mansour & Cairo branches.",
  keywords: [
    "kitchen design",
    "interior design",
    "Baghdad",
    "premium kitchens",
    "bedroom design",
    "Cucina Plus",
    "Iraq",
  ],
  openGraph: {
    title: "Cucina Plus | Premium Kitchens & Interiors",
    description:
      "European-inspired kitchen design and execution in Baghdad, Iraq.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,700;0,800;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
