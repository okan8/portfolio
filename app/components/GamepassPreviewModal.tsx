"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  const [isChecked, setIsChecked] = useState(false)
  const [availableBalance, setAvailableBalance] = useState<number | null>(null)
  const [balanceError, setBalanceError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("https://robux.tr/shopier/balance.php")
        const data = await response.json()
        setAvailableBalance(data.robux)
      } catch (error) {
        console.error("Error fetching balance:", error)
        setBalanceError("Stok bilgisi alınamadı.")
      }
    }

    if (show) {
      fetchBalance()
    }
  }, [show])

  if (!show) return null

  const discountedRobux = gamepassDetails ? Math.floor(gamepassDetails.price * 0.7) : 0
  const hasEnoughStock = availableBalance !== null && gamepassDetails && availableBalance >= gamepassDetails.price

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fadeIn">
        <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-xl md:text-2xl font-bold flex items-center">
            <Coins className="h-6 md:h-7 w-6 md:w-7 mr-3 text-yellow-300" />
            Gamepass Önizleme
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-6 md:h-7 w-6 md:w-7" />
          </button>
        </div>
        <div className="p-6 md:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 md:py-12">
              <div className="animate-spin rounded-full h-12 md:h-16 w-12 md:w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-6 md:py-8">
              <AlertTriangle className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 md:mb-6" />
              <p className="font-medium text-lg md:text-xl">{error}</p>
            </div>
          ) : (
            gamepassDetails && (
              <div className="space-y-6 md:space-y-8">
                <div className="bg-blue-50 p-6 md:p-8 rounded-xl">
                  <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-6">{gamepassDetails.name}</h4>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Gamepass ID:</span>
                      <span className="font-medium">{gamepassDetails.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Oluşturan:</span>
                      <span className="font-medium">{gamepassDetails.creator.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Gamepass Fiyatı:</span>
                      <span className="font-medium flex items-center">
                        <Coins className="h-5 md:h-6 w-5 md:w-6 mr-2 text-yellow-500" />
                        {gamepassDetails.price} R$
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Size Gelecek Robux:</span>
                      <span className="font-medium flex items-center">
                        <Coins className="h-5 md:h-6 w-5 md:w-6 mr-2 text-green-500" />
                        {discountedRobux} R$
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Fiyat:</span>
                      <span className="font-medium">{gamepassDetails.priceTL.toFixed(2)} TL</span>
                    </div>
                  </div>
                </div>

                {balanceError ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
                    <p className="font-bold">Hata</p>
                    <p>{balanceError}</p>
                  </div>
                ) : !hasEnoughStock ? (
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                    <p className="font-bold">Yetersiz Stok</p>
                    <p>
                      Şu anda bu kadar stok yok. Mevcut stok: {availableBalance} R$. Lütfen daha düşük miktarda bir
                      gamepass seçin veya daha sonra tekrar deneyin.
                    </p>
                  </div>
                ) : null}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="gamepass-confirmation"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="gamepass-confirmation" className="text-sm text-gray-700">
                    Sağladığım gamepass ID'nin bana ait olduğunu kabul ediyorum.
                  </label>
                </div>

                <button
                  onClick={onSubmit}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 md:py-5 px-6 md:px-8 rounded-xl text-lg md:text-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center ${
                    !isChecked || isSubmitting || !hasEnoughStock ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isChecked || isSubmitting || !hasEnoughStock}
                >
                  <ShoppingCart className="inline-block mr-3 h-5 md:h-6 w-5 md:w-6" />
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

