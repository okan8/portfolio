import type React from "react"
import { AlertCircle, Clock, HeadphonesIcon, CheckCircle2, Shield } from "lucide-react"

export const FeaturesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
        <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center text-gray-800">
          <AlertCircle className="mr-3 md:mr-4 text-red-500 h-6 md:h-8 w-6 md:w-8" />
          Önemli Bilgiler
        </h3>
        <ul className="space-y-4 md:space-y-6">
          <li className="flex items-start bg-gradient-to-br from-red-50 to-red-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <AlertCircle className="h-6 md:h-7 w-6 md:w-7 text-red-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
            <p className="text-base md:text-lg text-red-700 font-medium">
              Sipariş verildikten sonra gamepass fiyatını değiştirmeyiniz, bu işlemin sonlanmasına sebep olur!
            </p>
          </li>
          <li className="flex items-start bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <Clock className="h-6 md:h-7 w-6 md:w-7 text-blue-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
            <p className="text-base md:text-lg text-blue-700 font-medium">
              Ödeme ardından en geç 1dk içinde hesabınızda görünür.
            </p>
          </li>
          <li className="flex items-start bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <CheckCircle2 className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
            <p className="text-base md:text-lg text-green-700 font-medium">Sitemiz 7/24 açıktır.</p>
          </li>
          <li className="flex items-start bg-gradient-to-br from-purple-50 to-purple-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <HeadphonesIcon className="h-6 md:h-7 w-6 md:w-7 text-purple-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
            <p className="text-base md:text-lg text-purple-700 font-medium">
              Destek için sağ alttaki butona tıklayın ve bize ulaşın.
            </p>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
        <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center text-gray-800">
          <CheckCircle2 className="mr-3 md:mr-4 text-green-500 h-6 md:h-8 w-6 md:w-8" />
          Neden Biz?
        </h3>
        <div className="grid gap-4 md:gap-6">
          <div className="flex items-center p-6 md:p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <Clock className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4" />
            <span className="text-base md:text-lg text-green-700 font-semibold">Anında Teslimat</span>
          </div>
          <div className="flex items-center p-6 md:p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <HeadphonesIcon className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4" />
            <span className="text-base md:text-lg text-green-700 font-semibold">7/24 Canlı Destek</span>
          </div>
          <div className="flex items-center p-6 md:p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <Shield className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4" />
            <span className="text-base md:text-lg text-green-700 font-semibold">Güvenli Ödeme</span>
          </div>
          <div className="flex items-center p-6 md:p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
            <CheckCircle2 className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4" />
            <span className="text-base md:text-lg text-green-700 font-semibold">İade Garantisi</span>
          </div>
        </div>
      </div>
    </div>
  )
}

