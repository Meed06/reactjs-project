"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import toponelaser from "../images/logo-toponelaser.png";
import Image from "next/image";
interface NavbarProps {
  onReservationClick: () => void
}

export default function Navbar({ onReservationClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add a useEffect to handle active link highlighting based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("text-gold-600")
            link.classList.add("text-gray-800")
          })

          document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach((link) => {
            link.classList.remove("text-gray-800")
            link.classList.add("text-gold-600")
          })
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the navLinks array to point to section IDs instead of routes
  const navLinks = [
    { name: "ACCUEIL", href: "#home" },
    { name: "TOP ONE LASER", href: "#about" },
    { name: "NOS TRAITEMENT", href: "#services" },
    { name: "TÉMOIGNAGES", href: "#testimonials" },
    { name: "CONTACT", href: "#contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Image
              src={toponelaser || "/placeholder.svg"}
              alt="TOP ONE LASER"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={link.href}
                  className="nav-link text-sm font-medium text-gray-800 hover:text-gold-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const targetId = link.href.substring(1)
                    const targetElement = document.getElementById(targetId)
                    if (targetElement) {
                      window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for navbar height
                        behavior: "smooth",
                      })
                    }
                    setMobileMenuOpen(false)
                  }}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button className="bg-gold-600 hover:bg-gold-700 text-white rounded-full px-6" onClick={onReservationClick}>
              FAIRE UNE RÉSERVATION
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="border-l border-gray-300 pl-4"
          >
            <Button variant="ghost" className="text-sm font-medium">
              Français
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-800 hover:text-gold-600 py-2 border-b border-gray-100"
                  onClick={(e) => {
                    e.preventDefault()
                    const targetId = link.href.substring(1)
                    const targetElement = document.getElementById(targetId)
                    if (targetElement) {
                      window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth",
                      })
                    }
                    setMobileMenuOpen(false)
                  }}
                >
                  {link.name}
                </a>
              ))}
              <Button
                className="bg-gold-600 hover:bg-gold-700 text-white rounded-full w-full mt-4"
                onClick={() => {
                  onReservationClick()
                  setMobileMenuOpen(false)
                }}
              >
                FAIRE UNE RÉSERVATION
              </Button>
              <Button variant="outline" className="w-full">
                Français
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

