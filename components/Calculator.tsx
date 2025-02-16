"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Coins, CalculatorIcon } from "lucide-react"

export const Calculator: React.FC = () => {
  const [robux, setRobux] = useState<string>("")
  const [tl, setTl] = useState<string>("")

  useEffect(() => {
    if (robux) {
      const robuxAmount = Number.parseFloat(robux)
      const tlPrice = (robuxAmount / 1429) * 250
      setTl(tlPrice.toFixed(2))
    } else {
      setTl("")
    }
  }, [robux])

  const handleRobuxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setRobux(value)
    }
  }

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-12 md:mb-20 border border-blue-100 transform hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500">
      <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
        <CalculatorIcon className="h-8 md:h-10 w-8 md:w-10 mr-3 md:mr-4 text-blue-500" />
        Robux - TL Hesaplayıcı
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="relative">
          <label htmlFor="robux-input" className="block text-sm font-medium text-gray-700 mb-2">
            Robux Miktarı
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Coins className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="robux-input"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Robux miktarı girin"
              value={robux}
              onChange={handleRobuxChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">R$</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <label htmlFor="tl-input" className="block text-sm font-medium text-gray-700 mb-2">
            Türk Lirası Karşılığı
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₺</span>
            </div>
            <input
              type="text"
              id="tl-input"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md bg-gray-100"
              placeholder="0.00"
              value={tl}
              readOnly
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">TL</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 italic">
        * Hesaplamalar yaklaşık değerlerdir. Güncel kur: 1429 Robux = 250 TL
      </p>
    </div>
  )
}

