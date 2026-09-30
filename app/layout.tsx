import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "كوجينا بلس | مطابخ وديكورات فاخرة في بغداد",
  description:
    "كوجينا بلس للمطابخ والديكورات المتخصصة في تصميم وتنفيذ المطابخ الحديثة والديكورات الداخلية الفاخرة. فرع المنصور وفرع القاهرة - بغداد، العراق.",
  keywords: [
    "مطابخ",
    "ديكورات داخلية",
    "كوجينا بلس",
    "بغداد",
    "المنصور",
    "مطابخ فاخرة",
    "غرف نوم",
  ],
  openGraph: {
    title: "كوجينا بلس | مطابخ وديكورات فاخرة",
    description: "تصميم وتنفيذ المطابخ والديكورات الداخلية الفاخرة في بغداد",
    locale: "ar_IQ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-arabic antialiased">{children}</body>
    </html>
  );
}
