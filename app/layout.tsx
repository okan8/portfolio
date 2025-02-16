import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Robux.tr - Güvenli ve Hızlı Robux Alım Satım",
  description: "Türkiye'nin en güvenilir dijital ürün satış platformunda hızlı ve güvenli Robux alışverişi yapın.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'