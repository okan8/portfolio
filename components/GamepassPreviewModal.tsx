import type React from "react"
import { X, Coins, ShoppingCart, AlertTriangle } from "lucide-react"

interface GamepassDetails {
  id: string
  name: string
  price: number
  priceTL: number
  creator: {
    name: string
  }
}

interface GamepassPreviewModalProps {
  show: boolean
  onClose: () => void
  gamepassDetails: GamepassDetails | null
  isLoading: boolean
  error: string | null
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export const GamepassPreviewModal: React.FC<GamepassPreviewModalProps> = ({
  show,
  onClose,
  gamepassDetails,
  isLoading,
  error,
  onSubmit,
  isSubmitting,
}) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fadeIn">
        <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-xl md:text-2xl font-bold flex items-center">
            <Coins className="h-5 md:h-6 w-5 md:w-6 mr-2 md:mr-3 text-yellow-300" />
            Gamepass Önizleme
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-5 md:h-6 w-5 md:w-6" />
          </button>
        </div>
        <div className="p-6 md:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-6 md:py-8">
              <div className="animate-spin rounded-full h-10 md:h-12 w-10 md:w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-4 md:py-6">
              <AlertTriangle className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-3 md:mb-4" />
              <p className="font-medium text-base md:text-lg">{error}</p>
            </div>
          ) : (
            gamepassDetails && (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
                  <h4 className="text-lg md:text-xl font-bold text-blue-900 mb-3 md:mb-4">{gamepassDetails.name}</h4>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Gamepass ID:</span>
                      <span className="font-medium">{gamepassDetails.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Oluşturan:</span>
                      <span className="font-medium">{gamepassDetails.creator.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Robux:</span>
                      <span className="font-medium flex items-center">
                        <Coins className="h-4 md:h-5 w-4 md:w-5 mr-2 text-yellow-500" />
                        {gamepassDetails.price} R$
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Fiyat:</span>
                      <span className="font-medium">{gamepassDetails.priceTL.toFixed(2)} TL</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl text-base md:text-lg font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  <ShoppingCart className="inline-block mr-2 h-4 md:h-5 w-4 md:w-5" />
                  {isSubmitting ? "İşleniyor..." : "Satın Al"}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

