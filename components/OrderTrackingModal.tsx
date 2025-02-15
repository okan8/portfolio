import type React from "react"
import { X, Coins } from "lucide-react"
import { OrderForm } from "./OrderForm"

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

interface OrderTrackingModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (data: { orderId: string }) => void
  isCheckingOrder: boolean
  orderStatus: OrderStatus | null
  showOrderStatus: boolean
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
  onShowPayment: (orderId: number) => void // Add this line
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  show,
  onClose,
  onSubmit,
  isCheckingOrder,
  orderStatus,
  showOrderStatus,
  getStatusColor,
  getStatusText,
  onShowPayment,
}) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fadeIn">
        <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Sipariş Sorgula</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-5 md:h-6 w-5 md:w-6" />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <OrderForm onSubmit={onSubmit} isSubmitting={isCheckingOrder} />

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
                  {orderStatus.order.status === "pending" && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => onShowPayment(orderStatus.order.order_id)}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center"
                      >
                        <span>Ödeme Yap</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-red-600 font-medium text-center py-3 md:py-4">
                  {orderStatus.error || "Sipariş bulunamadı."}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

