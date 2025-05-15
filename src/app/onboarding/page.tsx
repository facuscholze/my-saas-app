"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function OnboardingPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [company, setCompany] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      full_name: fullName,
      company,
    })

    if (!error) router.push("/dashboard")
    else alert("Hubo un error")
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-6">
      <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
      <p>Completá tu perfil para comenzar</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="border rounded p-2 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Empresa"
          className="border rounded p-2 w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded px-4 py-2"
        >
          {loading ? "Guardando..." : "Continuar"}
        </button>
      </form>
    </div>
  )
}
