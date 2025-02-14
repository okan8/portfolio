import React from 'react';
import { X } from 'lucide-react';

interface PrivacyProps {
  onClose: () => void;
}

function Privacy({ onClose }: PrivacyProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-2xl font-bold">Gizlilik Politikası</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-5rem)]">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6">1. Veri Toplama</h2>
            <p className="mb-4">
              Robux.tr olarak, müşterilerimizin gizliliğine önem veriyoruz. Sitemiz üzerinden sadece sipariş işlemlerinin gerçekleştirilmesi için gerekli minimum bilgileri topluyoruz.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-8">2. Ödeme Bilgileri</h2>
            <p className="mb-4">
              Ödeme işlemleri sırasında girilen kart bilgilerine kesinlikle erişimimiz bulunmamaktadır. Tüm ödemeler, güvenli ödeme altyapısı üzerinden gerçekleştirilmektedir.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-8">3. Bilgi Güvenliği</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Tüm veriler SSL şifreleme ile korunmaktadır.</li>
              <li className="mb-2">Kişisel bilgileriniz üçüncü taraflarla paylaşılmaz.</li>
              <li className="mb-2">Sipariş bilgileri sadece işlem doğrulama amacıyla saklanır.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6 mt-8">4. Çerezler</h2>
            <p className="mb-4">
              Sitemiz, kullanıcı deneyimini iyileştirmek ve temel işlevleri sağlamak için çerezler kullanmaktadır. Bu çerezler, oturum yönetimi ve site performansı için gereklidir.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-8">5. İletişim</h2>
            <p className="mb-4">
              Gizlilik politikamız hakkında sorularınız için 7/24 canlı destek hattımız üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;