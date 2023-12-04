import React, { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl/client';
import { redirect } from 'next/navigation';

const locales: { [key: string]: string } = { en: "English", ar: "Arabic" }

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function RootLayout({ params: { locale }, children, }: { params: { locale: string }, children: ReactNode }) {

  // only defined locales
  if (!locales[locale]) {
    redirect("/error/404")
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
};
