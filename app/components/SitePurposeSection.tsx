import type React from "react"
import { Coins, Zap, HeadphonesIcon } from "lucide-react"

export const SitePurposeSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-[2rem] shadow-2xl p-8 md:p-12 mb-12 md:mb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 flex items-center">
          <Coins className="h-8 md:h-10 w-8 md:w-10 mr-4 text-yellow-300" />
          Sitemizin Amacı
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          Sitemizin amacı kullanıcılara %20-30 oranında daha uygun robux temin etmektir. Ödemeleri gamepass yolu ile
          yapıyor ve anında yolluyoruz. Güvenli ve hızlı alışveriş deneyimi için en uygun çözümleri sunuyoruz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center">
            <Coins className="h-8 md:h-10 w-8 md:w-10 text-yellow-300 mr-4" />
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-2">%30</div>
              <div className="text-blue-100">Daha Uygun Fiyat</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center">
            <Zap className="h-8 md:h-10 w-8 md:w-10 text-yellow-300 mr-4" />
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Anında</div>
              <div className="text-blue-100">Teslimat</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center">
            <HeadphonesIcon className="h-8 md:h-10 w-8 md:w-10 text-yellow-300 mr-4" />
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-2">7/24</div>
              <div className="text-blue-100">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

