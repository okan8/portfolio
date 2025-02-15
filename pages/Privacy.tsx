import type React from "react"
import { X } from "lucide-react"

interface PrivacyProps {
  onClose: () => void
}

const Privacy: React.FC<PrivacyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
        <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Gizlilik Politikası</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-5 md:h-6 w-5 md:w-6" />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          <h4 className="text-lg md:text-xl font-semibold mb-4">1. Bilgi Toplama</h4>
          <p className="mb-4">
            Robux.tr, hizmetlerimizi sunmak için gerekli olan minimum bilgiyi toplar. Bu bilgiler arasında e-posta
            adresi, kullanıcı adı ve ödeme bilgileri bulunabilir.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">2. Bilgi Kullanımı</h4>
          <p className="mb-4">
            Topladığımız bilgiler, hizmetlerimizi sunmak, işlemleri gerçekleştirmek ve müşteri desteği sağlamak için
            kullanılır.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">3. Bilgi Güvenliği</h4>
          <p className="mb-4">
            Kullanıcı bilgilerini korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. Hassas bilgiler
            şifrelenerek saklanır.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">4. Üçüncü Taraflarla Bilgi Paylaşımı</h4>
          <p className="mb-4">Kullanıcı bilgilerini, yasal zorunluluklar dışında üçüncü taraflarla paylaşmıyoruz.</p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">5. Çerezler</h4>
          <p>
            Sitemizde, kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerez
            kullanımını kontrol edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacy

