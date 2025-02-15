import type React from "react"
import { X } from "lucide-react"

interface PaymentModalProps {
  show: boolean
  onClose: () => void
  paymentUrl: string
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ show, onClose, paymentUrl }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative animate-fadeIn">
        <div className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h3 className="text-xl md:text-2xl font-bold">Ödeme Sayfası</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
          >
            <X className="h-5 md:h-6 w-5 md:w-6" />
          </button>
        </div>
        <div className="relative w-full h-[80vh]">
          <iframe src={paymentUrl} className="absolute inset-0 w-full h-full border-0" title="Ödeme Sayfası" />
        </div>
      </div>
    </div>
  )
}

