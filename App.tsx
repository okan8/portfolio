"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Coins } from "lucide-react"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"
import { SitePurposeSection } from "./components/SitePurposeSection"
import { GamepassForm } from "./components/GamepassForm"
import { NoticesGrid } from "./components/NoticesGrid"
import { FeaturesGrid } from "./components/FeaturesGrid"
import { Footer } from "./components/Footer"
import { GamepassPreviewModal } from "./components/GamepassPreviewModal"
import { PaymentModal } from "./components/PaymentModal"
import { OrderTrackingModal } from "./components/OrderTrackingModal"
import { CompletedOrders } from "./components/CompletedOrders"

interface GamepassDetails {
  id: string
  name: string
  price: number
  priceTL: number
  creator: {
    name: string
  }
}

interface OrderStatus {
  success: boolean
  order?: {
    order_id: number
    gamepass_id: string
    status: string
    price_tl: string
    price_rb: string
    rb_status: string
  }
  error?: string
}

function App() {
  const [gamepassId, setGamepassId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState("")
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [gamepassDetails, setGamepassDetails] = useState<GamepassDetails | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)

  const [orderId, setOrderId] = useState("")
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null)
  const [isCheckingOrder, setIsCheckingOrder] = useState(false)
  const [showOrderStatus, setShowOrderStatus] = useState(false)

  const calculateTLPrice = useCallback((robuxPrice: number) => {
    return (robuxPrice / 1443) * 260
  }, [])

  const handlePreviewGamepass = useCallback(
    async (data: { gamepassId: string }) => {
      setIsLoadingPreview(true)
      setPreviewError(null)
      setGamepassDetails(null)
      setShowPreviewModal(true)

      try {
        const response = await fetch(
          `https://apis.roproxy.com/game-passes/v1/game-passes/${data.gamepassId}/product-info`,
        )
        if (!response.ok) {
          throw new Error("Gamepass bulunamadı")
        }

        const responseData = await response.json()
        const priceTL = calculateTLPrice(responseData.PriceInRobux)

        setGamepassDetails({
          id: data.gamepassId,
          name: responseData.Name,
          price: responseData.PriceInRobux,
          priceTL: priceTL,
          creator: {
            name: responseData.Creator.Name,
          },
        })
      } catch (error) {
        setPreviewError("Gamepass bilgileri alınamadı. Lütfen ID'yi kontrol edin.")
        console.error("Gamepass preview error:", error)
      } finally {
        setIsLoadingPreview(false)
      }
    },
    [calculateTLPrice],
  )

  const handleSubmit = useCallback(async () => {
    if (!gamepassDetails) return
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("gamepass_id", gamepassDetails.id)

      const response = await fetch("https://robux.tr/order.php", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Sipariş oluşturulurken bir hata oluştu")
      }

      const data = await response.json()
      if (data.payment_url) {
        setPaymentUrl(data.payment_url)
        setShowModal(true)
        setShowPreviewModal(false)
        setOrderId(data.order_id)
      } else {
        throw new Error("Ödeme URL'i bulunamadı")
      }
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.")
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [gamepassDetails])

  const handleOrderCheck = useCallback(async (data: { orderId: string }) => {
    setIsCheckingOrder(true)
    setShowOrderStatus(true)

    try {
      const response = await fetch(`https://robux.tr/shopier/query_order.php?order_id=${data.orderId}`)
      const responseData: OrderStatus = await response.json()
      setOrderStatus(responseData)
    } catch (error) {
      console.error("Order check error:", error)
      setOrderStatus({
        success: false,
        error: "Sipariş sorgulama sırasında bir hata oluştu.",
      })
    } finally {
      setIsCheckingOrder(false)
    }
  }, [])

  const getStatusColor = useMemo(
    () => (status: string) => {
      switch (status) {
        case "completed":
          return "text-green-600"
        case "failed":
          return "text-red-600"
        default:
          return "text-yellow-600"
      }
    },
    [],
  )

  const getStatusText = useMemo(
    () => (status: string) => {
      switch (status) {
        case "completed":
          return "Tamamlandı"
        case "failed":
          return "Başarısız"
        case "pending":
          return "Ödeme Bekleniyor"
        default:
          return "Beklemede"
      }
    },
    [],
  )

  const resetOrderStatus = useCallback(() => {
    setOrderId("")
    setOrderStatus(null)
    setShowOrderStatus(false)
    setShowOrderModal(false)
  }, [])

  const handleShowPayment = useCallback((orderId: number) => {
    setPaymentUrl(`https://robux.tr/shopier/?id=${orderId}`)
    setShowModal(true)
    setShowOrderModal(false) // Close the order tracking modal
  }, [])

  useEffect(() => {
    // Tawk.to Integration
    const s1 = document.createElement("script")
    s1.async = true
    s1.src = "https://embed.tawk.to/67ae44183a842732607e7f66/1ik0bk0fn"
    s1.charset = "UTF-8"
    s1.setAttribute("crossorigin", "*")
    document.head.appendChild(s1)
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50">
      <Header onOpenOrderModal={() => setShowOrderModal(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <HeroSection />
        <SitePurposeSection />
        <NoticesGrid />

        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-12 md:mb-20 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
          <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
            <Coins className="h-8 md:h-10 w-8 md:w-10 mr-3 md:mr-4 text-yellow-500" />
            Yeni Sipariş Oluştur
          </h3>
          <GamepassForm onSubmit={handlePreviewGamepass} isSubmitting={isLoadingPreview} />
        </div>

        <FeaturesGrid />
        <CompletedOrders />
        <Footer onShowTerms={() => setShowTerms(true)} onShowPrivacy={() => setShowPrivacy(true)} />
      </main>

      <GamepassPreviewModal
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        gamepassDetails={gamepassDetails}
        isLoading={isLoadingPreview}
        error={previewError}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <PaymentModal show={showModal} onClose={() => setShowModal(false)} paymentUrl={paymentUrl} />

      <OrderTrackingModal
        show={showOrderModal}
        onClose={resetOrderStatus}
        onSubmit={handleOrderCheck}
        isCheckingOrder={isCheckingOrder}
        orderStatus={orderStatus}
        showOrderStatus={showOrderStatus}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        onShowPayment={handleShowPayment}
      />

      {showTerms && <Terms onClose={() => setShowTerms(false)} />}
      {showPrivacy && <Privacy onClose={() => setShowPrivacy(false)} />}
    </div>
  )
}

export default App

