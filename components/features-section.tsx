import { motion } from "framer-motion"
import { Gamepad2, Palette, Users } from "lucide-react"

const features = [
  {
    name: "Intuitive Game Engines",
    description: "Build 2D and 3D games with our powerful and easy-to-use engines.",
    icon: Gamepad2,
  },
  {
    name: "Asset Marketplace",
    description: "Access a vast library of high-quality assets to enhance your games.",
    icon: Palette,
  },
  {
    name: "Multiplayer SDK",
    description: "Easily add multiplayer functionality to your games with our robust SDK.",
    icon: Users,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to build your game</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-secondary/50 rounded-lg"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

