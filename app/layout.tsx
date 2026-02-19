import React from "react"
import type { Metadata } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-plus-jakarta-sans' })

export const metadata: Metadata = {
  title: 'Visão Real | Descubra o que está impedindo seu negócio de crescer',
  description: 'Diagnóstico estratégico online que identifica o principal problema do seu negócio. Em 3 minutos você entende o que está impedindo seu crescimento.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#131625',
  openGraph: {
    title: 'Visão Real | Descubra o que está impedindo seu negócio de crescer',
    description: 'Diagnóstico estratégico online que identifica o principal problema do seu negócio em 3 minutos.',
    type: 'website',
    images: [
      {
        url: '/icon0.svg',
        width: 32,
        height: 32,
        alt: 'Visão Real Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/icon0.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#131625" />
      </head>
      <body className={`${plusJakartaSans.variable} font-plus-jakarta-sans antialiased w-full min-h-screen overflow-x-hidden bg-[#091019] text-foreground`}>
        {children}
        <Analytics />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vc8ll2hllo");
            `
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NM3PTH3LLS"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NM3PTH3LLS');
              gtag('config', 'AW-17950470830');
            `
          }}
        />
      </body>
    </html>
  )
}
