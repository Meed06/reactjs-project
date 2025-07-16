"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Calendar, Check } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

const treatments = [
  { id: "epilation", name: "Épilation Laser" },
  { id: "rajeunissement", name: "Rajeunissement de la Peau" },
  { id: "antiage", name: "Traitement Anti-Âge" },
  { id: "visage", name: "Soins du Visage" },
  { id: "corps", name: "Traitement Corporel" },
]

export default function ReservationForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactType: "email",
    email: "",
    phone: "",
    treatment: "",
    date: "",
    time: "",
  })
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    treatment: false,
    date: false,
    time: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const validateStep = () => {
    if (formStep === 0) {
      const errors = {
        firstName: !formData.firstName,
        lastName: !formData.lastName,
        email: formData.contactType === "email" && !formData.email,
        phone: formData.contactType === "phone" && !formData.phone,
      }
      setFormErrors((prev) => ({ ...prev, ...errors }))
      return !Object.values(errors).some(Boolean)
    } else if (formStep === 1) {
      const errors = {
        treatment: !formData.treatment,
      }
      setFormErrors((prev) => ({ ...prev, ...errors }))
      return !Object.values(errors).some(Boolean)
    } else if (formStep === 2) {
      const errors = {
        date: !formData.date,
        time: !formData.time,
      }
      setFormErrors((prev) => ({ ...prev, ...errors }))
      return !Object.values(errors).some(Boolean)
    }
    return true
  }

  const nextStep = () => {
    if (validateStep()) {
      if (formStep < 2) {
        setFormStep((prev) => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Create a new reservation object
    const newReservation = {
      id: `res-${uuidv4().substring(0, 8)}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactType: formData.contactType as "email" | "phone",
      email: formData.contactType === "email" ? formData.email : undefined,
      phone: formData.contactType === "phone" ? formData.phone : undefined,
      treatment: formData.treatment,
      date: formData.date,
      time: formData.time,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    // Get existing reservations from localStorage or initialize empty array
    const existingReservations = JSON.parse(localStorage.getItem("reservations") || "[]")

    // Add new reservation to the array
    const updatedReservations = [newReservation, ...existingReservations]

    // Save back to localStorage
    localStorage.setItem("reservations", JSON.stringify(updatedReservations))

    // Show success message
    setIsSubmitted(true)

    // Reset form after 5 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false)
      setFormStep(0)
      setFormData({
        firstName: "",
        lastName: "",
        contactType: "email",
        email: "",
        phone: "",
        treatment: "",
        date: "",
        time: "",
      })
      onClose()
    }, 5000)
  }

  // Generate available times for the selected date
  const generateTimeSlots = () => {
    const times = []
    for (let hour = 10; hour <= 18; hour++) {
      if (hour !== 13) {
        // Skip lunch hour
        times.push(`${hour}:00`)
        if (hour !== 18) times.push(`${hour}:30`)
      }
    }
    return times
  }

  const timeSlots = generateTimeSlots()

  // Get available dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip Sundays (0 is Sunday in JavaScript)
      if (date.getDay() !== 0) {
        const formattedDate = date.toISOString().split("T")[0]
        dates.push(formattedDate)
      }
    }

    return dates
  }

  const availableDates = getAvailableDates()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gold-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-serif">Réservation</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-gold-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Réservation Confirmée!</h3>
                  <p className="text-gray-600 mb-6">
                    Merci pour votre réservation. Nous vous contacterons bientôt pour confirmer votre rendez-vous.
                  </p>
                  <Button onClick={onClose} className="bg-gold-600 hover:bg-gold-700 text-white">
                    Fermer
                  </Button>
                </div>
              ) : (
                <>
                  {/* Progress indicator */}
                  <div className="flex justify-between mb-8">
                    {[0, 1, 2].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            formStep >= step ? "bg-gold-600 text-white" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {step + 1}
                        </div>
                        <span className="text-xs mt-1 text-gray-600">
                          {step === 0 ? "Informations" : step === 1 ? "Traitement" : "Date"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Personal Information */}
                  {formStep === 0 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-medium mb-4">Vos Informations</h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className={formErrors.firstName ? "text-red-500" : ""}>
                              Prénom*
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={formErrors.firstName ? "border-red-500" : ""}
                            />
                            {formErrors.firstName && (
                              <p className="text-red-500 text-xs mt-1">Veuillez entrer votre prénom</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="lastName" className={formErrors.lastName ? "text-red-500" : ""}>
                              Nom*
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={formErrors.lastName ? "border-red-500" : ""}
                            />
                            {formErrors.lastName && (
                              <p className="text-red-500 text-xs mt-1">Veuillez entrer votre nom</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label>Comment souhaitez-vous être contacté?</Label>
                          <RadioGroup
                            value={formData.contactType}
                            onValueChange={(value) => handleSelectChange("contactType", value)}
                            className="flex space-x-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="email" />
                              <Label htmlFor="email">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="phone" />
                              <Label htmlFor="phone">Téléphone</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {formData.contactType === "email" ? (
                          <div>
                            <Label htmlFor="email" className={formErrors.email ? "text-red-500" : ""}>
                              Email*
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={formErrors.email ? "border-red-500" : ""}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-xs mt-1">Veuillez entrer votre email</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <Label htmlFor="phone" className={formErrors.phone ? "text-red-500" : ""}>
                              Téléphone*
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              className={formErrors.phone ? "border-red-500" : ""}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-xs mt-1">Veuillez entrer votre numéro de téléphone</p>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Treatment Selection */}
                  {formStep === 1 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-medium mb-4">Choisissez Votre Traitement</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="treatment" className={formErrors.treatment ? "text-red-500" : ""}>
                            Traitement*
                          </Label>
                          <Select
                            value={formData.treatment}
                            onValueChange={(value) => handleSelectChange("treatment", value)}
                          >
                            <SelectTrigger className={formErrors.treatment ? "border-red-500" : ""}>
                              <SelectValue placeholder="Sélectionnez un traitement" />
                            </SelectTrigger>
                            <SelectContent>
                              {treatments.map((treatment) => (
                                <SelectItem key={treatment.id} value={treatment.id}>
                                  {treatment.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.treatment && (
                            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner un traitement</p>
                          )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Description du traitement</h4>
                          <p className="text-gray-600 text-sm">
                            {formData.treatment === "epilation"
                              ? "L'épilation laser offre une solution permanente pour éliminer les poils indésirables. Nos technologies avancées sont adaptées à tous les types de peau."
                              : formData.treatment === "rajeunissement"
                                ? "Nos traitements de rajeunissement cutané stimulent la production de collagène pour une peau plus ferme, plus lisse et d'apparence plus jeune."
                                : formData.treatment === "antiage"
                                  ? "Les traitements anti-âge ciblent les rides, ridules et autres signes du vieillissement pour un teint éclatant et rajeuni."
                                  : formData.treatment === "visage"
                                    ? "Nos soins du visage personnalisés répondent à tous les besoins cutanés, du nettoyage en profondeur à l'hydratation intense."
                                    : formData.treatment === "corps"
                                      ? "Les traitements corporels aident à tonifier, raffermir et sculpter votre silhouette pour des résultats visibles et durables."
                                      : "Sélectionnez un traitement pour voir sa description."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Date and Time Selection */}
                  {formStep === 2 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-medium mb-4">Choisissez Date et Heure</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="date" className={formErrors.date ? "text-red-500" : ""}>
                            Date*
                          </Label>
                          <Select value={formData.date} onValueChange={(value) => handleSelectChange("date", value)}>
                            <SelectTrigger className={formErrors.date ? "border-red-500" : ""}>
                              <SelectValue placeholder="Sélectionnez une date" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDates.map((date) => {
                                const d = new Date(date)
                                const formattedDate = d.toLocaleDateString("fr-FR", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                })
                                return (
                                  <SelectItem key={date} value={date}>
                                    {formattedDate}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          {formErrors.date && (
                            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une date</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="time" className={formErrors.time ? "text-red-500" : ""}>
                            Heure*
                          </Label>
                          <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                            <SelectTrigger className={formErrors.time ? "border-red-500" : ""}>
                              <SelectValue placeholder="Sélectionnez une heure" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.time && (
                            <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une heure</p>
                          )}
                        </div>

                        <div className="bg-gold-50 p-4 rounded-lg mt-4 flex items-start">
                          <Calendar className="h-5 w-5 text-gold-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Votre rendez-vous sera confirmé par notre équipe dans les 24 heures. Vous recevrez une
                            confirmation par {formData.contactType === "email" ? "email" : "téléphone"}.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={formStep === 0 ? onClose : prevStep} className="border-gray-300">
                      {formStep === 0 ? "Annuler" : "Précédent"}
                    </Button>
                    <Button onClick={nextStep} className="bg-gold-600 hover:bg-gold-700 text-white">
                      {formStep < 2 ? "Suivant" : "Confirmer"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

