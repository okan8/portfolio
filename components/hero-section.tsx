import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            className="text-5xl font-bold tracking-tight sm:text-7xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Amazing <span className="text-gradient">Games</span> Together
          </motion.h1>
          <motion.p
            className="text-xl leading-8 text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join a community of creators and build incredible games. Our platform provides everything you need to bring
            your ideas to life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-gradient" asChild>
              <Link href="/create">
                Start Creating <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/games">Explore Games</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Gamepad2 className="h-64 w-64 text-primary/20 animate-float" />
      </motion.div>
    </div>
  )
}

