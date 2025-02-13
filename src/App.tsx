import React, { useState } from 'react';
import { AlertCircle, ShoppingCart, Clock, HeadphonesIcon, CheckCircle2, CreditCard, Shield } from 'lucide-react';

function App() {
  const [gamepassId, setGamepassId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        window.location.href = data.payment_url;
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-600">Robux.tr</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Dijital Ürün Satış Platformu</h2>
          <p className="text-xl text-gray-600">Anında Teslimat, Güvenli Alışveriş</p>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-semibold mb-6">Yeni Sipariş Oluştur</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="gamepass_id" className="block text-sm font-medium text-gray-700 mb-2">
                Gamepass ID
              </label>
              <input
                type="text"
                id="gamepass_id"
                value={gamepassId}
                onChange={(e) => setGamepassId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <ShoppingCart className="inline-block mr-2 h-5 w-5" />
              {isSubmitting ? 'İşleniyor...' : 'Sipariş Oluştur'}
            </button>

            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4">
                <img src="https://raw.githubusercontent.com/kristofferandreasen/simple-react-payment-icons/master/src/icons/mastercard-curved-64px.png" alt="Mastercard" className="h-8" />
                <img src="https://www.visa.com.tr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-8" />
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-gray-600 mr-1" />
                  <span className="text-sm text-gray-600">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-gray-600 mr-1" />
                  <span className="text-sm text-gray-600">SSL Korumalı</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Important Notes */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="mr-2 text-red-500" />
              Önemli Bilgiler
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                <p>Sipariş verildikten sonra gamepass fiyatını değişmeyiniz, bu işlemin sonlanmasına sebep olur!</p>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <p>Ödeme ardından en geç 1dk içinde hesabınızda görünür.</p>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <p>Sitemiz 7/24 açıktır.</p>
              </li>
              <li className="flex items-start">
                <HeadphonesIcon className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <p>Destek için sağ alttaki butona tıklayın ve bize ulaşın.</p>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle2 className="mr-2 text-green-500" />
              Neden Biz?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Anında Teslimat</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>7/24 Canlı Destek</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>Güvenli Ödeme</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span>İade Garantisi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p className="mb-2">
            Sipariş oluşturarak{' '}
            <a href="#" className="text-blue-600 hover:underline">Kullanım Koşulları</a>{' '}
            ve{' '}
            <a href="#" className="text-blue-600 hover:underline">Gizlilik Politikası</a>'nı
            kabul etmiş olursunuz.
          </p>
          <p>
            © 2024 Robux.tr - Tüm hakları saklıdır.
          </p>
        </div>
      </main>

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