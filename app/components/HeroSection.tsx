import type React from "react"
import { Coins } from "lucide-react"

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="flex justify-center mb-6 md:mb-8">
        <Coins className="h-20 md:h-28 w-20 md:w-28 text-yellow-500 animate-bounce" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
        Güvenli ve Hızlı
        <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Robux Alım Satım
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
        Türkiye'nin en güvenilir dijital ürün satış platformunda hızlı ve güvenli alışveriş deneyimi
      </p>
    </div>
  )
}

