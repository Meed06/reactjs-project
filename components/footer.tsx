"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"
import toponelaser from "../images/logo-toponelaser.png"

export default function Footer() {
  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Épilation Laser", href: "/services/epilation" },
        { name: "Rajeunissement", href: "/services/rajeunissement" },
        { name: "Traitement Corporel", href: "/services/corps" },
        { name: "Soins du Visage", href: "/services/visage" },
      ],
    },
    {
      title: "À Propos",
      links: [
        { name: "Notre Histoire", href: "/about" },
        { name: "Équipe", href: "/team" },
        { name: "Témoignages", href: "/testimonials" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Légal",
      links: [
        { name: "Conditions d'utilisation", href: "/terms" },
        { name: "Politique de confidentialité", href: "/privacy" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={toponelaser || "/placeholder.svg"}
                alt="TOP ONE LASER"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              TOP ONE LASER est votre destination de confiance pour des traitements laser de haute qualité. Notre équipe
              d&apos;experts vous accompagne dans votre parcours beauté avec des solutions personnalisées.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-medium text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Inscrivez-vous pour recevoir nos offres spéciales et actualités.</p>
            <div className="flex space-x-2">
              <Input placeholder="Votre email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-gold-600 hover:bg-gold-700 text-white">OK</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TOP ONE LASER. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

