import React, { useState } from 'react';
import { AlertCircle, ShoppingCart, Clock, HeadphonesIcon, CheckCircle2, CreditCard, Shield, AlertTriangle, X, Zap, Lock, Wifi } from 'lucide-react';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  const [gamepassId, setGamepassId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-black tracking-tight">
              Robux.tr
              <div className="text-lg font-normal mt-1 text-blue-200">Dijital Ürün Satış Platformu</div>
            </h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">7/24 Destek</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            Güvenli ve Hızlı
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Robux Alım Satım
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Türkiye'nin en güvenilir dijital ürün satış platformunda hızlı ve güvenli alışveriş deneyimi
          </p>
        </div>

        {/* Notices Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Security Notice */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 p-6 rounded-2xl shadow-lg">
            <div className="flex items-start">
              <Lock className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Güvenli Alışveriş</h3>
                <p className="text-green-700 text-sm">
                  Ödeme bilgilerinize kesinlikle erişimimiz yoktur. Tüm ödemeler güvenli altyapı üzerinden gerçekleştirilir.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Notice */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-6 rounded-2xl shadow-lg">
            <div className="flex items-start">
              <Wifi className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Performans Bilgisi</h3>
                <p className="text-yellow-700 text-sm">
                  Site performansında sorun yaşamamanız için lütfen VPN kullanmayınız.
                </p>
              </div>
            </div>
          </div>

          {/* Critical Warning */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-2xl shadow-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Önemli Uyarı</h3>
                <p className="text-red-700 text-sm">
                  Her sipariş için yeni bir gamepass oluşturmanız gerekmektedir. Önceki ID'leri kullanmayın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-12 mb-20 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
          <h3 className="text-4xl font-black mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
            <ShoppingCart className="mr-4 h-10 w-10" />
            Yeni Sipariş Oluştur
          </h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="gamepass_id" className="block text-xl font-medium text-gray-700 mb-4">
                Gamepass ID
              </label>
              <input
                type="text"
                id="gamepass_id"
                value={gamepassId}
                onChange={(e) => setGamepassId(e.target.value)}
                className="w-full px-8 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-inner"
                placeholder="Gamepass ID'nizi girin"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-8 rounded-2xl text-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              disabled={isSubmitting}
            >
              <Zap className="inline-block mr-3 h-6 w-6 group-hover:animate-bounce" />
              {isSubmitting ? 'İşleniyor...' : 'Hemen Sipariş Ver'}
            </button>

            {/* Payment Methods */}
            <div className="mt-12 pt-10 border-t-2 border-gray-100">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mc_dla_symbol_92.png" alt="Mastercard" className="h-12" />
                <img src="https://www.visa.com.tr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-12" />
                <div className="flex items-center px-8 py-4 bg-gray-50 rounded-2xl shadow-lg">
                  <CreditCard className="h-7 w-7 text-blue-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-700">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center px-8 py-4 bg-gray-50 rounded-2xl shadow-lg">
                  <Shield className="h-7 w-7 text-blue-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-700">SSL Korumalı</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Important Notes */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-12 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
            <h3 className="text-3xl font-black mb-10 flex items-center text-gray-800">
              <AlertCircle className="mr-4 text-red-500 h-8 w-8" />
              Önemli Bilgiler
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <AlertCircle className="h-7 w-7 text-red-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-red-700 font-medium text-lg">Sipariş verildikten sonra gamepass fiyatını değiştirmeyiniz, bu işlemin sonlanmasına sebep olur!</p>
              </li>
              <li className="flex items-start bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <Clock className="h-7 w-7 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-blue-700 font-medium text-lg">Ödeme ardından en geç 1dk içinde hesabınızda görünür.</p>
              </li>
              <li className="flex items-start bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <CheckCircle2 className="h-7 w-7 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-green-700 font-medium text-lg">Sitemiz 7/24 açıktır.</p>
              </li>
              <li className="flex items-start bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <HeadphonesIcon className="h-7 w-7 text-purple-500 mr-4 flex-shrink-0 mt-1" />
                <p className="text-purple-700 font-medium text-lg">Destek için sağ alttaki butona tıklayın ve bize ulaşın.</p>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-12 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
            <h3 className="text-3xl font-black mb-10 flex items-center text-gray-800">
              <CheckCircle2 className="mr-4 text-green-500 h-8 w-8" />
              Neden Biz?
            </h3>
            <div className="grid gap-6">
              <div className="flex items-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <Zap className="h-7 w-7 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">Anında Teslimat</span>
              </div>
              <div className="flex items-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <HeadphonesIcon className="h-7 w-7 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">7/24 Canlı Destek</span>
              </div>
              <div className="flex items-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <Shield className="h-7 w-7 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">Güvenli Ödeme</span>
              </div>
              <div className="flex items-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <CheckCircle2 className="h-7 w-7 text-green-500 mr-4" />
                <span className="text-green-700 font-semibold text-lg">İade Garantisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-20 text-center">
          <p className="mb-4 text-gray-600 text-lg">
            Sipariş oluşturarak{' '}
            <button
              onClick={() => setShowTerms(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Kullanım Koşulları
            </button>{' '}
            ve{' '}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Gizlilik Politikası
            </button>'nı
            kabul etmiş olursunuz.
          </p>
          <p className="text-gray-500">
            © 2024 Robux.tr - Tüm hakları saklıdır.
          </p>
        </div>
      </main>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
            <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h3 className="text-2xl font-bold">Ödeme Sayfası</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
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

      {/* Terms Modal */}
      {showTerms && <Terms onClose={() => setShowTerms(false)} />}

      {/* Privacy Modal */}
      {showPrivacy && <Privacy onClose={() => setShowPrivacy(false)} />}

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