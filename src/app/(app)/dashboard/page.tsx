
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [batchId, setBatchId] = useState('HB-ASH-2407-001')

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (batchId) {
      router.push(`/verify/${batchId}`)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl md:text-4xl">Welcome to Ayura 🌱, {user?.email || 'Guest'}!</h1>
        <p className="text-muted-foreground">
          Ensuring transparency and trust in the Ayurvedic supply chain, from farm to pharmacy.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Product Provenance</CardTitle>
          <CardDescription>
            Enter a product's batch ID to view its complete journey on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="w-full sm:flex-1">
              <Label htmlFor="batch-id">Batch ID</Label>
              <Input
                id="batch-id"
                placeholder="e.g., HB-ASH-2407-001"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit">
              <Search />
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
