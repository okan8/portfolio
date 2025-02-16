import type React from "react"
import { Coins } from "lucide-react"

export const PricingTable: React.FC = () => {
  const pricingData = [
    { robux: 100, price: 17.5 },
    { robux: 400, price: 70 },
    { robux: 800, price: 140 },
    { robux: 1429, price: 250 },
    { robux: 2000, price: 350 },
  ]

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 mb-12 md:mb-20 border border-blue-100">
      <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
        <Coins className="h-8 md:h-10 w-8 md:w-10 mr-3 md:mr-4 text-yellow-500" />
        Fiyat Tarifesi
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-4 py-3 text-left text-blue-600">Robux Miktarı</th>
              <th className="px-4 py-3 text-left text-blue-600">Fiyat (TL)</th>
            </tr>
          </thead>
          <tbody>
            {pricingData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-3 flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-yellow-500" />
                  {item.robux.toLocaleString()} R$
                </td>
                <td className="px-4 py-3">{item.price.toFixed(2)} TL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-gray-600 italic">
        * Fiyatlar örnek olarak verilmiştir. Güncel fiyatlar için lütfen sipariş oluşturunuz.
      </p>
    </div>
  )
}

