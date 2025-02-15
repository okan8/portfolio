import type React from "react"
import { X } from "lucide-react"

interface TermsProps {
  onClose: () => void
}

const Terms: React.FC<TermsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
        <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Kullanım Koşulları</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-5 md:h-6 w-5 md:w-6" />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          <h4 className="text-lg md:text-xl font-semibold mb-4">1. Hizmet Kullanımı</h4>
          <p className="mb-4">
            Robux.tr platformunu kullanarak, bu kullanım koşullarını kabul etmiş olursunuz. Platformumuz üzerinden
            yapılan tüm işlemler, Roblox'un hizmet şartlarına uygun olmalıdır.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">2. Hesap Güvenliği</h4>
          <p className="mb-4">
            Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayın ve düzenli olarak değiştirin.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">3. Ödemeler ve İadeler</h4>
          <p className="mb-4">
            Tüm ödemeler, güvenli ödeme altyapımız üzerinden gerçekleştirilir. İade politikamız hakkında detaylı bilgi
            için müşteri hizmetlerimizle iletişime geçin.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">4. Hizmet Değişiklikleri</h4>
          <p className="mb-4">
            Robux.tr, herhangi bir zamanda hizmetlerini değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
          </p>

          <h4 className="text-lg md:text-xl font-semibold mb-4">5. Sorumluluk Reddi</h4>
          <p>
            Robux.tr, platformun kullanımından kaynaklanan herhangi bir doğrudan veya dolaylı zarardan sorumlu
            tutulamaz.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Terms

