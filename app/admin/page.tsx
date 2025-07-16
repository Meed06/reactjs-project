"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Image from "next/image"
import toponelaser from "../../images/logo-toponelaser.png"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (isLoggedIn) {
      router.push("/admin/dashboard")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, hardcoded credentials
      // In a real app, this would be a secure authentication API call
      if (email === "admin@toponelaser.com" && password === "admin123") {
        localStorage.setItem("adminLoggedIn", "true")
        router.push("/admin/dashboard")
      } else {
        setError("Email ou mot de passe incorrect")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src={toponelaser || "/placeholder.svg"}
            alt="TOP ONE LASER"
            width={180}
            height={50}
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-serif text-gray-900">Administration</h1>
          <p className="text-gray-600 mt-2">Connectez-vous pour gérer les réservations</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Connexion Admin</CardTitle>
            <CardDescription>Entrez vos identifiants pour accéder au tableau de bord</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@toponelaser.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-gold-600 hover:bg-gold-700 text-white" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <p>Pour la démo, utilisez: admin@toponelaser.com / admin123</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

