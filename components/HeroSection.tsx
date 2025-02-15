import type React from "react"
import { Coins } from "lucide-react"

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex justify-center mb-4 md:mb-6">
        <Coins className="h-16 md:h-24 w-16 md:w-24 text-yellow-500 animate-bounce" />
      </div>
      <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
        Güvenli ve Hızlı
        <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Robux Alım Satım
        </span>
      </h2>
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
        Türkiye'nin en güvenilir dijital ürün satış platformunda hızlı ve güvenli alışveriş deneyimi
      </p>
    </div>
  )
}

