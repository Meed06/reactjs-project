"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Sparkles, Scissors, Heart } from "lucide-react"

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: <Zap className="h-10 w-10 text-gold-600" />,
      title: "Épilation Laser",
      description: "Traitement permanent pour une peau douce et sans poils, adapté à tous les types de peau.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-gold-600" />,
      title: "Rajeunissement",
      description: "Retrouvez l'éclat et la fermeté de votre peau grâce à nos traitements anti-âge avancés.",
    },
    {
      icon: <Scissors className="h-10 w-10 text-gold-600" />,
      title: "Traitement Corporel",
      description: "Solutions personnalisées pour sculpter et tonifier votre corps avec des résultats visibles.",
    },
    {
      icon: <Heart className="h-10 w-10 text-gold-600" />,
      title: "Soins du Visage",
      description:
        "Traitements spécialisés pour tous les problèmes de peau, du nettoyage profond à l'hydratation intense.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="services" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Nos Services Spécialisés</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de traitements laser et soins esthétiques conçus pour révéler votre beauté
            naturelle.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-2">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

