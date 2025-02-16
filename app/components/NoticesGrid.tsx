import type React from "react"
import { Lock, Wifi, AlertTriangle } from "lucide-react"

export const NoticesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
      <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 p-6 rounded-xl md:rounded-2xl shadow-lg">
        <div className="flex items-start">
          <Lock className="h-6 md:h-8 w-6 md:w-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">Güvenli Alışveriş</h3>
            <p className="text-base md:text-lg text-green-700">
              Ödeme bilgilerinize kesinlikle erişimimiz yoktur. Tüm ödemeler güvenli altyapı üzerinden gerçekleştirilir.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-6 rounded-xl md:rounded-2xl shadow-lg">
        <div className="flex items-start">
          <Wifi className="h-6 md:h-8 w-6 md:w-8 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-yellow-800 mb-2">Performans Bilgisi</h3>
            <p className="text-base md:text-lg text-yellow-700">
              Site performansında sorun yaşamamanız için lütfen VPN kullanmayınız.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-xl md:rounded-2xl shadow-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-6 md:h-8 w-6 md:w-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Önemli Uyarı</h3>
            <p className="text-base md:text-lg text-red-700">
              Her sipariş için yeni bir gamepass oluşturmanız gerekmektedir. Önceki ID'leri kullanmayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

