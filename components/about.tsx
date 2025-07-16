"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"
import image1 from "../public/hh.png"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    "Équipement laser de dernière génération",
    "Professionnels certifiés et expérimentés",
    "Protocoles personnalisés pour chaque client",
    "Environnement luxueux et confortable",
  ]

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-100 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-100 rounded-full z-0"></div>

            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={image1 || "/placeholder.svg"}
                alt="TOP ONE LASER Clinic"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              L&apos;Excellence au Service <br />
              de Votre Beauté
            </h2>

            <p className="text-gray-600 mb-6">
              Chez TOP ONE LASER, nous combinons technologie de pointe et expertise pour offrir des traitements laser
              d&apos;exception. Notre approche personnalisée garantit des résultats optimaux, adaptés à votre type de
              peau et à vos objectifs esthétiques.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="mr-3 bg-gold-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-gold-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button className="bg-gold-600 hover:bg-gold-700 text-white rounded-full px-8">
              DÉCOUVRIR NOTRE HISTOIRE
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

