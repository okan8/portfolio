import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Search } from "lucide-react"

const schema = z.object({
  orderId: z.string().min(1, "Sipariş ID is required"),
})

type FormData = z.infer<typeof schema>

interface OrderFormProps {
  onSubmit: (data: FormData) => void
  isSubmitting: boolean
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="order_id_modal" className="block text-base md:text-lg font-medium text-gray-700 mb-2">
          Sipariş ID
        </label>
        <input
          type="text"
          id="order_id_modal"
          {...register("orderId")}
          className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
          placeholder="Sipariş ID'nizi girin"
          disabled={isSubmitting}
        />
        {errors.orderId && <p className="mt-2 text-sm text-red-600">{errors.orderId.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl text-base md:text-lg font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center"
        disabled={isSubmitting}
      >
        <Search className="inline-block mr-2 h-4 md:h-5 w-4 md:w-5" />
        {isSubmitting ? "Sorgulanıyor..." : "Siparişi Sorgula"}
      </button>
    </form>
  )
}

