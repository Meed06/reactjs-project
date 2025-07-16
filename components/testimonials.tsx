"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: "Sophie Laurent",
      role: "Cliente Fidèle",
      content:
        "Les traitements laser chez TOP ONE LASER ont complètement transformé ma routine beauté. Plus besoin de m'épiler quotidiennement, ma peau est douce et parfaite. L'équipe est professionnelle et attentionnée.",
      rating: 5,
    },
    {
      name: "Marc Dubois",
      role: "Client",
      content:
        "Après avoir essayé plusieurs cliniques, j'ai enfin trouvé la perfection chez TOP ONE LASER. Les résultats sont impressionnants et l'environnement est luxueux et relaxant. Je recommande vivement.",
      rating: 5,
    },
    {
      name: "Émilie Moreau",
      role: "Cliente Régulière",
      content:
        "Service impeccable et résultats visibles dès la première séance. Le personnel est expert et prend le temps d'expliquer chaque étape du traitement. Une expérience 5 étoiles à tous les niveaux.",
      rating: 5,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Ce Que Disent Nos Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits et leurs résultats transformatifs.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="border-none shadow-lg bg-white">
                <CardContent className="pt-10 pb-10">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg text-center italic mb-8">"{testimonials[current].content}"</p>
                  <div className="text-center">
                    <h4 className="font-medium text-lg">{testimonials[current].name}</h4>
                    <p className="text-gray-500">{testimonials[current].role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === current ? "bg-gold-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-12 transform -translate-y-1/2 rounded-full border-gray-200 hover:bg-gold-50 hover:border-gold-200"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-12 transform -translate-y-1/2 rounded-full border-gray-200 hover:bg-gold-50 hover:border-gold-200"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </section>
  )
}

