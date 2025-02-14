import React, { useState } from 'react';
import { AlertCircle, ShoppingCart, Clock, HeadphonesIcon, CheckCircle2, CreditCard, Shield, AlertTriangle, X } from 'lucide-react';

function App() {
  const [gamepassId, setGamepassId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://robux.tr/order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `gamepass_id=${encodeURIComponent(gamepassId)}`,
      });

      if (!response.ok) {
        throw new Error('Sipariş oluşturulurken bir hata oluştu');
      }

      const data = await response.json();
      if (data.payment_url) {
        setPaymentUrl(data.payment_url);
        setShowModal(true);
      } else {
        throw new Error('Ödeme URL\'i bulunamadı');
      }
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">
              Robux.tr
            </h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">7/24 Destek</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Dijital Ürün Satış
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Platformu
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Güvenli, hızlı ve kesintisiz hizmet için doğru adrestesiniz
          </p>
        </div>

        {/* Critical Warning */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-8 rounded-2xl mb-12 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-3">ÖNEMLİ UYARI!</h3>
              <p className="text-red-700 leading-relaxed">
                Yeni bir sipariş verirken lütfen önceki gamepass ID'sini kullanmayın! 
                Her sipariş için yeni bir gamepass oluşturmanız gerekmektedir. 
                Bot hesabımızda hiçbir gamepass silinmemektedir, bu sayede size robuxu 
                gönderdiğimizi kanıtlayabiliyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-16 border border-blue-100 transform hover:shadow-xl transition-all duration-300">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Yeni Sipariş Oluştur
          </h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="gamepass_id" className="block text-lg font-medium text-gray-700 mb-3">
                Gamepass ID
              </label>
              <input
                type="text"
                id="gamepass_id"
                value={gamepassId}
                onChange={(e) => setGamepassId(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                placeholder="Gamepass ID'nizi girin"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-5 px-8 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              <ShoppingCart className="inline-block mr-3 h-6 w-6" />
              {isSubmitting ? 'İşleniyor...' : 'Sipariş Oluştur'}
            </button>

            {/* Payment Methods */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <img src="https://www.mastercard.com.tr/content/dam/public/mastercardcom/tr/tr/images/mc-logo-52.svg" alt="Mastercard" className="h-10" />
                <img src="https://www.visa.com.tr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-10" />
                <div className="flex items-center px-6 py-3 bg-gray-50 rounded-xl shadow-sm">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-base font-semibold text-gray-700">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center px-6 py-3 bg-gray-50 rounded-xl shadow-sm">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-base font-semibold text-gray-700">SSL Korumalı</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Important Notes */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-blue-100 transform hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-800">
              <AlertCircle className="mr-4 text-red-500 h-7 w-7" />
              Önemli Bilgiler
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl">
                <AlertCircle className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-red-700 font-medium">Sipariş verildikten sonra gamepass fiyatını değiştirmeyiniz, bu işlemin sonlanmasına sebep olur!</p>
              </li>
              <li className="flex items-start bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl">
                <Clock className="h-6 w-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-blue-700 font-medium">Ödeme ardından en geç 1dk içinde hesabınızda görünür.</p>
              </li>
              <li className="flex items-start bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-green-700 font-medium">Sitemiz 7/24 açıktır.</p>
              </li>
              <li className="flex items-start bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl">
                <HeadphonesIcon className="h-6 w-6 text-purple-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-purple-700 font-medium">Destek için sağ alttaki butona tıklayın ve bize ulaşın.</p>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-blue-100 transform hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-800">
              <CheckCircle2 className="mr-4 text-green-500 h-7 w-7" />
              Neden Biz?
            </h3>
            <div className="grid gap-6">
              <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">Anında Teslimat</span>
              </div>
              <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">7/24 Canlı Destek</span>
              </div>
              <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">Güvenli Ödeme</span>
              </div>
              <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">İade Garantisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600 text-lg">
            Sipariş oluşturarak{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">Kullanım Koşulları</a>{' '}
            ve{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">Gizlilik Politikası</a>'nı
            kabul etmiş olursunuz.
          </p>
          <p className="text-gray-500">
            © 2024 Robux.tr - Tüm hakları saklıdır.
          </p>
        </div>
      </main>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Ödeme Sayfası</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative w-full h-[80vh]">
              <iframe
                src={paymentUrl}
                className="absolute inset-0 w-full h-full border-0"
                title="Ödeme Sayfası"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tawk.to Integration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/67ae44183a842732607e7f66/1ik0bk0fn';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `
        }}
      />
    </div>
  );
}

export default App;