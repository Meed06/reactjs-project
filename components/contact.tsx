"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-gold-600" />,
      title: "Adresse",
      details: "Josefine Centre, Bd Allal Al Fassi, n14, Marrakech 40000",
    },
    {
      icon: <Phone className="h-5 w-5 text-gold-600" />,
      title: "Téléphone",
      details: "+212 700775050",
    },
    {
      icon: <Mail className="h-5 w-5 text-gold-600" />,
      title: "Email",
      details: "contact@toponelaser.com",
    },
    {
      icon: <Clock className="h-5 w-5 text-gold-600" />,
      title: "Horaires",
      details: "Lun-Ven: 10h-19h | Sam: 10h-17h",
    },
  ]

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Contactez-Nous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prenez rendez-vous pour une consultation personnalisée ou posez-nous vos questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif mb-6">Envoyez-nous un message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <Input id="name" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Votre email" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <Input id="subject" placeholder="Sujet de votre message" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Votre message" rows={5} />
                </div>

                <Button className="bg-gold-600 hover:bg-gold-700 text-white w-full">ENVOYER</Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-serif mb-6">Informations de contact</h3>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex"
                  >
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.9289599963956!2d-7.984297023555708!3d31.629499274481184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ2LjIiTiA3wrA1OCc1OS4zIlc!5e0!3m2!1sen!2sus!4v1617984825858!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

