import type React from "react"

interface FooterProps {
  onShowTerms: () => void
  onShowPrivacy: () => void
}

export const Footer: React.FC<FooterProps> = ({ onShowTerms, onShowPrivacy }) => {
  return (
    <div className="mt-12 md:mt-20 text-center">
      <p className="mb-4 text-base md:text-lg text-gray-600">
        Sipariş oluşturarak{" "}
        <button
          onClick={onShowTerms}
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
        >
          Kullanım Koşulları
        </button>{" "}
        ve{" "}
        <button
          onClick={onShowPrivacy}
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
        >
          Gizlilik Politikası
        </button>
        'nı kabul etmiş olursunuz.
      </p>
      <p className="text-sm md:text-base text-gray-500">© 2024 Robux.tr - Tüm hakları saklıdır.</p>
    </div>
  )
}

