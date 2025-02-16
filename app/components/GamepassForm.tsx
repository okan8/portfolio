import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye } from "lucide-react"

const schema = z.object({
  gamepassId: z.string().min(1, "Gamepass ID is required").regex(/^\d+$/, "Gamepass ID must be a number"),
})

type FormData = z.infer<typeof schema>

interface GamepassFormProps {
  onSubmit: (data: FormData) => void
  isSubmitting: boolean
}

export const GamepassForm: React.FC<GamepassFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
      <div>
        <label htmlFor="gamepass_id" className="block text-lg md:text-xl font-medium text-gray-700 mb-3 md:mb-4">
          Gamepass ID
        </label>
        <input
          type="text"
          id="gamepass_id"
          {...register("gamepassId")}
          className="w-full px-6 md:px-8 py-4 md:py-5 text-base md:text-lg border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-inner"
          placeholder="Gamepass ID'nizi girin"
          disabled={isSubmitting}
        />
        {errors.gamepassId && <p className="mt-2 text-sm text-red-600">{errors.gamepassId.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
        disabled={isSubmitting}
      >
        <Eye className="inline-block mr-3 h-5 md:h-6 w-5 md:w-6 group-hover:animate-bounce" />
        {isSubmitting ? "Yükleniyor..." : "Gamepass'i Görüntüle"}
      </button>
    </form>
  )
}

