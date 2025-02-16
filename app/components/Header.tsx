import type React from "react"
import { Coins, Search, HeadphonesIcon } from "lucide-react"
import { RobuxBalance } from "./RobuxBalance"

interface HeaderProps {
  onOpenOrderModal: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal }) => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight flex flex-col items-center text-center md:text-left">
            <div className="flex items-center">
              <Coins className="h-8 md:h-12 w-8 md:w-12 mr-2 md:mr-4 text-yellow-300" />
              Robux.tr
            </div>
            <div className="text-sm md:text-lg font-normal mt-2 text-blue-200">Dijital Ürün Satış Platformu</div>
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <button
              onClick={onOpenOrderModal}
              className="w-full md:w-auto flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              <Search className="h-5 w-5 mr-2" />
              <span className="font-medium">Sipariş Sorgula</span>
            </button>
            <RobuxBalance />
            <div className="w-full md:w-auto flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
              <HeadphonesIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">7/24 Destek</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

