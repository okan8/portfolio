"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function HeroParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-background to-background" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-transparent blur-2xl" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative container flex flex-col items-center text-center space-y-8 py-32"
      >
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Next-Gen
            </span>
          </h1>
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white">Gaming Universe</h2>
        </div>

        <p className="max-w-[600px] text-gray-400 text-xl md:text-2xl">
          Experience revolutionary gameplay and stunning visuals in our latest releases
        </p>

        <div className="flex gap-4">
          <Link
            href="/games"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0",
            )}
          >
            Play Now
          </Link>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "backdrop-blur-sm bg-white/5 border-purple-500/20 hover:bg-white/10",
            )}
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[15%] w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[15%] w-32 h-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-20"
      />
    </div>
  )
}

