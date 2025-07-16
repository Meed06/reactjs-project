"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import About from "@/components/about"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ReservationForm from "@/components/reservation-form"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showReservationForm, setShowReservationForm] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Function to open reservation form - we'll pass this to components that need it
  const openReservationForm = () => {
    setShowReservationForm(true)
  }

  return (
    <main className="min-h-screen">
      <Navbar onReservationClick={openReservationForm} />
      <Hero onReservationClick={openReservationForm} />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button onClick={scrollToTop} size="icon" className="rounded-full bg-gold-600 hover:bg-gold-700 shadow-lg">
              <ChevronUp className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Form Modal */}
      <ReservationForm isOpen={showReservationForm} onClose={() => setShowReservationForm(false)} />
    </main>
  )
}

