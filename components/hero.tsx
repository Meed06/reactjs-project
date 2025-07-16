"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import homex from "../images/homex.jpg";

interface HeroProps {
  onReservationClick?: () => void
}

export default function Hero({ onReservationClick }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: isVisible ? 1 : 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${homex.src})`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-light text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Excellence des <br />
            <span className="font-normal">Traitements de Peau</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/90 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Bienvenue dans le monde de l&apos;épilation laser chez TOP ONE LASER, où nous redéfinissons les normes de la
            douceur et de la perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="bg-white hover:bg-white/90 text-gray-900 rounded-full px-8 py-6 text-sm font-medium">
              SAVOIR PLUS
            </Button>
            {onReservationClick && (
              <Button
                onClick={onReservationClick}
                className="bg-gold-600 hover:bg-gold-700 text-white rounded-full px-8 py-6 text-sm font-medium"
              >
                RÉSERVER MAINTENANT
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

