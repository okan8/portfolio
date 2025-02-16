"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Coins } from "lucide-react"

interface Order {
  order_id: string
  gamepass_id: string
  status: string
  price_tl: string
  price_rb: string
  rb_status: string
}

export const CompletedOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://robux.tr/shopier/completed_orders.php")
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders.slice(0, 5))
        } else {
          throw new Error("Invalid data format")
        }
      } catch (err) {
        setError("Siparişler yüklenirken bir hata oluştu.")
        console.error("Error fetching orders:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8 md:py-12">Yükleniyor...</div>
  }

  if (error) {
    return <div className="text-center py-8 md:py-12 text-red-600">{error}</div>
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 mb-16 md:mb-24 border border-blue-100">
      <h3 className="text-2xl md:text-3xl font-black mb-8 md:mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
        <Coins className="h-8 md:h-10 w-8 md:w-10 mr-4 text-green-500" />
        Son 5 Başarılı Sipariş
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">

              <th className="px-4 py-3 text-left">Tutar (TL)</th>
              <th className="px-4 py-3 text-left">Robux</th>
              <th className="px-4 py-3 text-left">Durum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id} className="border-b border-gray-200">

                <td className="px-4 py-3">{order.price_tl} TL</td>
                <td className="px-4 py-3">{order.price_rb}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

