"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import toponelaser from "../images/logo-toponelaser.png"

interface AdminNavbarProps {
  onLogout: () => void
}

export function AdminNavbar({ onLogout }: AdminNavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/admin/dashboard" className="flex items-center">
          <Image
            src={toponelaser || "/placeholder.svg"}
            alt="TOP ONE LASER"
            width={180}
            height={50}
            className="h-10 w-auto"
          />
          <span className="ml-2 text-lg font-medium text-gray-900">Admin</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

