import React, { useState, useEffect } from 'react';
import { AlertCircle, ShoppingCart, Clock, HeadphonesIcon, CheckCircle2, CreditCard, Shield, AlertTriangle, X, Zap, Lock, Wifi, Search, Eye, Coins } from 'lucide-react';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

interface OrderStatus {
  success: boolean;
  order?: {
    order_id: number;
    gamepass_id: string;
    status: string;
    price_tl: string;
    price_rb: string;
    rb_status: string;
  };
  error?: string;
}

interface GamepassDetails {
  name: string;
  price: number;
  priceTL: number;
  creator: {
    name: string;
  };
}

function App() {
  const [gamepassId, setGamepassId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [gamepassDetails, setGamepassDetails] = useState<GamepassDetails | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  
  // Order tracking states
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isCheckingOrder, setIsCheckingOrder] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);

  const calculateTLPrice = (robuxPrice: number) => {
    return (robuxPrice / 1443) * 260;
  };

  const handlePreviewGamepass = async () => {
    if (!gamepassId) return;
    
    setIsLoadingPreview(true);
    setPreviewError(null);
    setGamepassDetails(null);
    setShowPreviewModal(true);

    try {
      const response = await fetch(`https://apis.roproxy.com/game-passes/v1/game-passes/${gamepassId}/product-info`);
      if (!response.ok) {
        throw new Error('Gamepass bulunamadı');
      }

      const data = await response.json();
      const priceTL = calculateTLPrice(data.PriceInRobux);

      setGamepassDetails({
        name: data.Name,
        price: data.PriceInRobux,
        priceTL: priceTL,
        creator: {
          name: data.Creator.Name
        }
      });
    } catch (error) {
      setPreviewError('Gamepass bilgileri alınamadı. Lütfen ID\'yi kontrol edin.');
      console.error('Gamepass preview error:', error);
    } finally {
      setIsLoadingPreview(false);
    }
  };

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
        setShowPreviewModal(false);
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

  const handleOrderCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOrder(true);
    setShowOrderStatus(true);

    try {
      const response = await fetch(`https://robux.tr/shopier/query_order.php?order_id=${orderId}`);
      const data: OrderStatus = await response.json();
      setOrderStatus(data);
    } catch (error) {
      console.error('Order check error:', error);
      setOrderStatus({
        success: false,
        error: 'Sipariş sorgulama sırasında bir hata oluştu.'
      });
    } finally {
      setIsCheckingOrder(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'failed':
        return 'Başarısız';
      default:
        return 'Beklemede';
    }
  };

  const resetOrderStatus = () => {
    setOrderId('');
    setOrderStatus(null);
    setShowOrderStatus(false);
    setShowOrderModal(false);
  };

  useEffect(() => {
    // Tawk.to Integration
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/67ae44183a842732607e7f66/1ik0bk0fn';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.head.appendChild(s1);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="flex items-center">
                <Coins className="h-8 md:h-12 w-8 md:w-12 mr-2 md:mr-4 text-yellow-300" />
                Robux.tr
              </div>
              <div className="text-sm md:text-lg font-normal mt-1 text-blue-200">
                Dijital Ürün Satış Platformu
              </div>
            </h1>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full md:w-auto flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
              >
                <Search className="h-5 w-5 mr-2" />
                <span className="font-medium">Sipariş Sorgula</span>
              </button>
              <div className="w-full md:w-auto flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">7/24 Destek</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4 md:mb-6">
            <Coins className="h-16 md:h-24 w-16 md:w-24 text-yellow-500 animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            Güvenli ve Hızlı
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Robux Alım Satım
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Türkiye'nin en güvenilir dijital ürün satış platformunda hızlı ve güvenli alışveriş deneyimi
          </p>
        </div>

        {/* Site Purpose Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-8 md:mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center">
              <Coins className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-yellow-300" />
              Sitemizin Amacı
            </h3>
            <p className="text-lg md:text-xl leading-relaxed">
              Sitemizin amacı kullanıcılara %20-30 oranında daha uygun robux temin etmektir. Ödemeleri gamepass yolu ile yapıyor ve anında yolluyoruz. Güvenli ve hızlı alışveriş deneyimi için en uygun çözümleri sunuyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 flex items-center">
                <Coins className="h-6 md:h-8 w-6 md:w-8 text-yellow-300 mr-3" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">%30</div>
                  <div className="text-blue-100">Daha Uygun Fiyat</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 flex items-center">
                <Zap className="h-6 md:h-8 w-6 md:w-8 text-yellow-300 mr-3" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Anında</div>
                  <div className="text-blue-100">Teslimat</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 flex items-center">
                <HeadphonesIcon className="h-6 md:h-8 w-6 md:w-8 text-yellow-300 mr-3" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">7/24</div>
                  <div className="text-blue-100">Destek</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Security Notice */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex items-start">
              <Lock className="h-5 md:h-6 w-5 md:w-6 text-green-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base md:text-lg font-bold text-green-800 mb-2">Güvenli Alışveriş</h3>
                <p className="text-sm md:text-base text-green-700">
                  Ödeme bilgilerinize kesinlikle erişimimiz yoktur. Tüm ödemeler güvenli altyapı üzerinden gerçekleştirilir.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Notice */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex items-start">
              <Wifi className="h-5 md:h-6 w-5 md:w-6 text-yellow-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base md:text-lg font-bold text-yellow-800 mb-2">Performans Bilgisi</h3>
                <p className="text-sm md:text-base text-yellow-700">
                  Site performansında sorun yaşamamanız için lütfen VPN kullanmayınız.
                </p>
              </div>
            </div>
          </div>

          {/* Critical Warning */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 md:h-6 w-5 md:w-6 text-red-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base md:text-lg font-bold text-red-800 mb-2">Önemli Uyarı</h3>
                <p className="text-sm md:text-base text-red-700">
                  Her sipariş için yeni bir gamepass oluşturmanız gerekmektedir. Önceki ID'leri kullanmayın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-12 md:mb-20 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
          <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
            <Coins className="h-8 md:h-10 w-8 md:w-10 mr-3 md:mr-4 text-yellow-500" />
            Yeni Sipariş Oluştur
          </h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handlePreviewGamepass();
          }} className="space-y-6 md:space-y-8">
            <div>
              <label htmlFor="gamepass_id" className="block text-lg md:text-xl font-medium text-gray-700 mb-3 md:mb-4">
                Gamepass ID
              </label>
              <input
                type="text"
                id="gamepass_id"
                value={gamepassId}
                onChange={(e) => setGamepassId(e.target.value)}
                className="w-full px-6 md:px-8 py-4 md:py-5 text-base md:text-lg border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-inner"
                placeholder="Gamepass ID'nizi girin"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              disabled={isSubmitting || !gamepassId}
            >
              <Eye className="inline-block mr-3 h-5 md:h-6 w-5 md:w-6 group-hover:animate-bounce" />
              {isLoadingPreview ? 'Yükleniyor...' : 'Gamepass\'i Görüntüle'}
            </button>

            {/* Payment Methods */}
            <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t-2 border-gray-100">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mc_dla_symbol_92.png" alt="Mastercard" className="h-8 md:h-12" />
                <img src="https://www.visa.com.tr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-8 md:h-12" />
                <div className="flex items-center px-6 md:px-8 py-3 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl shadow-lg">
                  <CreditCard className="h-6 md:h-7 w-6 md:w-7 text-blue-600 mr-2 md:mr-3" />
                  <span className="text-base md:text-lg font-semibold text-gray-700">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center px-6 md:px-8 py-3 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl shadow-lg">
                  <Shield className="h-6 md:h-7 w-6 md:w-7 text-blue-600 mr-2 md:mr-3" />
                  <span className="text-base md:text-lg font-semibold text-gray-700">SSL Korumalı</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20">
          {/* Important Notes */}
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
            <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center text-gray-800">
              <AlertCircle className="mr-3 md:mr-4 text-red-500 h-6 md:h-8 w-6 md:w-8" />
              Önemli Bilgiler
            </h3>
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-start bg-gradient-to-br from-red-50 to-red-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <AlertCircle className="h-6 md:h-7 w-6 md:w-7 text-red-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-red-700 font-medium">Sipariş verildikten sonra gamepass fiyatını değiştirmeyiniz, bu işlemin sonlanmasına sebep olur!</p>
              </li>
              <li className="flex items-start bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <Clock className="h-6 md:h-7 w-6 md:w-7 text-blue-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-blue-700 font-medium">Ödeme ardından en geç 1dk içinde hesabınızda görünür.</p>
              </li>
              <li className="flex items-start bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <CheckCircle2 className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-green-700 font-medium">Sitemiz 7/24 açıktır.</p>
              </li>
              <li className="flex items-start bg-gradient-to-br from-purple-50 to-purple-100 p-6 md:p-8 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <HeadphonesIcon className="h-6 md:h-7 w-6 md:w-7 text-purple-500 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-purple-700 font-medium">Destek için sağ alttaki butona tıklayın ve bize ulaşın.</p>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
            <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center text-gray-800">
              <CheckCircle2 className="mr-3 md:mr-4 text-green-500 h-6 md:h-8 w-6 md:w-8" />
              Neden Biz?
            </h3>
            <div className="grid gap-4 md:gap-6">
              <div className="flex items-center p-6 md:p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl transform hover:scale-[1.02] transition-all duration-300">
                <Zap className="h-6 md:h-7 w-6 md:w-7 text-green-500 mr-3 md:mr-4" />
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

        {/* Terms and Conditions */}
        <div className="mt-12 md:mt-20 text-center">
          <p className="mb-4 text-base md:text-lg text-gray-600">
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
          <p className="text-sm md:text-base text-gray-500">
            © 2024 Robux.tr - Tüm hakları saklıdır.
          </p>
        </div>
      </main>

      {/* Gamepass Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fadeIn">
            <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h3 className="text-xl md:text-2xl font-bold flex items-center">
                <Coins className="h-5 md:h-6 w-5 md:w-6 mr-2 md:mr-3 text-yellow-300" />
                Gamepass Önizleme
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
              >
                <X className="h-5 md:h-6 w-5 md:w-6" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              {isLoadingPreview ? (
                <div className="flex items-center justify-center py-6 md:py-8">
                   <div className="animate-spin rounded-full h-10 md:h-12 w-10 md:w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : previewError ? (
                <div className="text-red-600 text-center py-4 md:py-6">
                  <AlertTriangle className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-3 md:mb-4" />
                  <p className="font-medium text-base md:text-lg">{previewError}</p>
                </div>
              ) : gamepassDetails && (
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
                    <h4 className="text-lg md:text-xl font-bold text-blue-900 mb-3 md:mb-4">{gamepassDetails.name}</h4>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Oluşturan:</span>
                        <span className="font-medium">{gamepassDetails.creator.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Robux:</span>
                        <span className="font-medium flex items-center">
                          <Coins className="h-4 md:h-5 w-4 md:w-5 mr-2 text-yellow-500" />
                          {gamepassDetails.price} R$
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Fiyat:</span>
                        <span className="font-medium">{gamepassDetails.priceTL.toFixed(2)} TL</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl text-base md:text-lg font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    <ShoppingCart className="inline-block mr-2 h-4 md:h-5 w-4 md:w-5" />
                    {isSubmitting ? 'İşleniyor...' : 'Satın Al'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
            <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h3 className="text-xl md:text-2xl font-bold">Ödeme Sayfası</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
              >
                <X className="h-5 md:h-6 w-5 md:w-6" />
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

      {/* Order Tracking Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fadeIn">
            <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h3 className="text-xl md:text-2xl font-bold">Sipariş Sorgula</h3>
              <button
                onClick={resetOrderStatus}
                className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
              >
                <X className="h-5 md:h-6 w-5 md:w-6" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <form onSubmit={handleOrderCheck} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="order_id_modal" className="block text-base md:text-lg font-medium text-gray-700 mb-2">
                    Sipariş ID
                  </label>
                  <input
                    type="text"
                    id="order_id_modal"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                    placeholder="Sipariş ID'nizi girin"
                    required
                    disabled={isCheckingOrder}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl text-base md:text-lg font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center"
                  disabled={isCheckingOrder}
                >
                  <Search className="inline-block mr-2 h-4 md:h-5 w-4 md:w-5" />
                  {isCheckingOrder ? 'Sorgulanıyor...' : 'Siparişi Sorgula'}
                </button>
              </form>

              {/* Order Status Display */}
              {showOrderStatus && orderStatus && (
                <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl bg-white border">
                  {orderStatus.success && orderStatus.order ? (
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Sipariş ID:</span>
                        <span className="font-bold">{orderStatus.order.order_id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Gamepass ID:</span>
                        <span className="font-bold">{orderStatus.order.gamepass_id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Ödeme Durumu:</span>
                        <span className={`font-bold ${getStatusColor(orderStatus.order.status)}`}>
                          {getStatusText(orderStatus.order.status)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Robux Durumu:</span>
                        <span className={`font-bold ${getStatusColor(orderStatus.order.rb_status)}`}>
                          {getStatusText(orderStatus.order.rb_status)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tutar:</span>
                        <span className="font-bold">{orderStatus.order.price_tl} TL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Robux Miktarı:</span>
                        <span className="font-bold flex items-center">
                          <Coins className="h-4 md:h-5 w-4 md:w-5 mr-2 text-yellow-500" />
                          {orderStatus.order.price_rb} Robux
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-600 font-medium text-center py-3 md:py-4">
                      {orderStatus.error || 'Sipariş bulunamadı.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && <Terms onClose={() => setShowTerms(false)} />}

      {/* Privacy Modal */}
      {showPrivacy && <Privacy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}

export default App;