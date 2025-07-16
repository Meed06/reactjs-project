"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, Clock, Search, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminNavbar } from "@/components/admin-navbar"

// Types for our reservation data
interface Reservation {
  id: string
  firstName: string
  lastName: string
  contactType: "email" | "phone"
  email?: string
  phone?: string
  treatment: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

// Sample data for demonstration
const sampleReservations: Reservation[] = [
  {
    id: "res-001",
    firstName: "Sophie",
    lastName: "Martin",
    contactType: "email",
    email: "sophie.martin@example.com",
    treatment: "epilation",
    date: "2025-03-20",
    time: "14:30",
    status: "pending",
    createdAt: "2025-03-13T10:23:45",
  },
  {
    id: "res-002",
    firstName: "Jean",
    lastName: "Dupont",
    contactType: "phone",
    phone: "06 12 34 56 78",
    treatment: "rajeunissement",
    date: "2025-03-18",
    time: "11:00",
    status: "confirmed",
    createdAt: "2025-03-12T15:42:18",
  },
  {
    id: "res-003",
    firstName: "Marie",
    lastName: "Dubois",
    contactType: "email",
    email: "marie.dubois@example.com",
    treatment: "visage",
    date: "2025-03-19",
    time: "16:00",
    status: "pending",
    createdAt: "2025-03-13T09:15:30",
  },
  {
    id: "res-004",
    firstName: "Pierre",
    lastName: "Leroy",
    contactType: "phone",
    phone: "07 98 76 54 32",
    treatment: "corps",
    date: "2025-03-21",
    time: "10:30",
    status: "pending",
    createdAt: "2025-03-13T14:05:12",
  },
  {
    id: "res-005",
    firstName: "Camille",
    lastName: "Bernard",
    contactType: "email",
    email: "camille.bernard@example.com",
    treatment: "antiage",
    date: "2025-03-17",
    time: "15:00",
    status: "cancelled",
    createdAt: "2025-03-11T11:32:45",
  },
]

// Map treatment IDs to readable names
const treatmentNames: Record<string, string> = {
  epilation: "Épilation Laser",
  rajeunissement: "Rajeunissement de la Peau",
  antiage: "Traitement Anti-Âge",
  visage: "Soins du Visage",
  corps: "Traitement Corporel",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Check authentication on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/admin")
    } else {
      // Load reservations from localStorage or use sample data
      const savedReservations = localStorage.getItem("reservations")
      if (savedReservations) {
        setReservations(JSON.parse(savedReservations))
      } else {
        // Use sample data for demonstration
        setReservations(sampleReservations)
        localStorage.setItem("reservations", JSON.stringify(sampleReservations))
      }
    }
  }, [router])

  // Filter reservations based on search term and active tab
  useEffect(() => {
    let filtered = reservations

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (res) =>
          res.firstName.toLowerCase().includes(term) ||
          res.lastName.toLowerCase().includes(term) ||
          res.email?.toLowerCase().includes(term) ||
          res.phone?.toLowerCase().includes(term) ||
          res.id.toLowerCase().includes(term),
      )
    }

    // Filter by status tab
    if (activeTab !== "all") {
      filtered = filtered.filter((res) => res.status === activeTab)
    }

    setFilteredReservations(filtered)
  }, [reservations, searchTerm, activeTab])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin")
  }

  const confirmReservation = () => {
    if (selectedReservation) {
      const updatedReservations = reservations.map((res) =>
        res.id === selectedReservation.id ? { ...res, status: "confirmed" } : res,
      )
      setReservations(updatedReservations)
      localStorage.setItem("reservations", JSON.stringify(updatedReservations))
      setIsConfirmDialogOpen(false)
    }
  }

  const deleteReservation = () => {
    if (selectedReservation) {
      const updatedReservations = reservations.filter((res) => res.id !== selectedReservation.id)
      setReservations(updatedReservations)
      localStorage.setItem("reservations", JSON.stringify(updatedReservations))
      setIsDeleteDialogOpen(false)
    }
  }

  // Format date to French locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Get counts for the tabs
  const pendingCount = reservations.filter((res) => res.status === "pending").length
  const confirmedCount = reservations.filter((res) => res.status === "confirmed").length
  const cancelledCount = reservations.filter((res) => res.status === "cancelled").length

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">En attente</CardTitle>
              <CardDescription>Réservations à confirmer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-amber-500 mr-4" />
                <span className="text-3xl font-bold">{pendingCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Confirmées</CardTitle>
              <CardDescription>Réservations validées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Check className="h-8 w-8 text-green-500 mr-4" />
                <span className="text-3xl font-bold">{confirmedCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total</CardTitle>
              <CardDescription>Toutes les réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-500 mr-4" />
                <span className="text-3xl font-bold">{reservations.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Gestion des Réservations</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">
                  Toutes
                  <Badge variant="outline" className="ml-2">
                    {reservations.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  En attente
                  <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                    {pendingCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="confirmed">
                  Confirmées
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                    {confirmedCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Annulées
                  <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                    {cancelledCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Traitement</TableHead>
                        <TableHead>Date & Heure</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReservations.length > 0 ? (
                        filteredReservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">{reservation.id}</TableCell>
                            <TableCell>
                              {reservation.firstName} {reservation.lastName}
                            </TableCell>
                            <TableCell>{treatmentNames[reservation.treatment] || reservation.treatment}</TableCell>
                            <TableCell>
                              {formatDate(reservation.date)} à {reservation.time}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  reservation.status === "confirmed"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : reservation.status === "pending"
                                      ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                      : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {reservation.status === "confirmed"
                                  ? "Confirmée"
                                  : reservation.status === "pending"
                                    ? "En attente"
                                    : "Annulée"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedReservation(reservation)
                                    setIsDetailsDialogOpen(true)
                                  }}
                                >
                                  Détails
                                </Button>
                                {reservation.status === "pending" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                                    onClick={() => {
                                      setSelectedReservation(reservation)
                                      setIsConfirmDialogOpen(true)
                                    }}
                                  >
                                    Confirmer
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                                  onClick={() => {
                                    setSelectedReservation(reservation)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  Supprimer
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            Aucune réservation trouvée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la réservation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir confirmer cette réservation ? Un email de confirmation sera envoyé au client.
            </DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="py-4">
              <p className="font-medium">
                {selectedReservation.firstName} {selectedReservation.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {treatmentNames[selectedReservation.treatment]} - {formatDate(selectedReservation.date)} à{" "}
                {selectedReservation.time}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={confirmReservation}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la réservation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="py-4">
              <p className="font-medium">
                {selectedReservation.firstName} {selectedReservation.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {treatmentNames[selectedReservation.treatment]} - {formatDate(selectedReservation.date)} à{" "}
                {selectedReservation.time}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={deleteReservation}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Prénom</p>
                  <p className="font-medium">{selectedReservation.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nom</p>
                  <p className="font-medium">{selectedReservation.lastName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">
                  {selectedReservation.contactType === "email" ? selectedReservation.email : selectedReservation.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Traitement</p>
                <p className="font-medium">{treatmentNames[selectedReservation.treatment]}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedReservation.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Heure</p>
                  <p className="font-medium">{selectedReservation.time}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <Badge
                  className={
                    selectedReservation.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : selectedReservation.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {selectedReservation.status === "confirmed"
                    ? "Confirmée"
                    : selectedReservation.status === "pending"
                      ? "En attente"
                      : "Annulée"}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date de création</p>
                <p className="font-medium">{new Date(selectedReservation.createdAt).toLocaleString("fr-FR")}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

