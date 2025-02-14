import React from 'react';
import { X } from 'lucide-react';

interface TermsProps {
  onClose: () => void;
}

function Terms({ onClose }: TermsProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-2xl font-bold">Kullanım Koşulları</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-5rem)]">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6">1. Genel Hükümler</h2>
            <p className="mb-4">
              Bu web sitesini kullanarak, bu kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen siteyi kullanmayın.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-8">2. Hizmet Kullanımı</h2>
            <p className="mb-4">
              Robux.tr üzerinden yapacağınız tüm işlemlerde, doğru ve güncel bilgiler sağlamakla yükümlüsünüz. Yanlış veya yanıltıcı bilgi verilmesi durumunda, siparişiniz iptal edilebilir.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-8">3. Ödeme ve İade Politikası</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Tüm ödemeler güvenli ödeme altyapısı üzerinden gerçekleştirilir.</li>
              <li className="mb-2">Başarılı ödemeler sonrası ürünler anında teslim edilir.</li>
              <li className="mb-2">Teknik sorunlar nedeniyle gerçekleşmeyen siparişlerde iade garantisi verilir.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6 mt-8">4. Sorumluluk Reddi</h2>
            <p className="mb-4">
              Robux.tr, hizmetlerinin kesintisiz ve hatasız olacağını garanti etmez. Site üzerinden gerçekleştirilen işlemlerde oluşabilecek teknik sorunlardan kaynaklı gecikmelerden sorumlu tutulamaz.
            </p>

            <h2 className="text-2xl font-bold mb-6 mt-8">5. Değişiklikler</h2>
            <p className="mb-4">
              Robux.tr, bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı tutar. Değişiklikler sitede yayınlandığı tarihte yürürlüğe girer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;