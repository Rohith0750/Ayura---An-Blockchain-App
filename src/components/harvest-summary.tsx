'use client'

import { useState, useTransition, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { summarizeHarvestDetails, SummarizeHarvestDetailsInput } from '@/ai/flows/summarize-harvest-details'
import { Skeleton } from './ui/skeleton'
import { BrainCircuit } from 'lucide-react'

type UserRole = 'consumer' | 'farmer' | 'processor' | 'admin'

interface HarvestSummaryProps {
  batchData: {
    batchId: string
    origin: string
    harvestDate: string
    testResults: string
    sustainabilityProofs: string
  }
}

export function HarvestSummary({ batchData }: HarvestSummaryProps) {
  const [role, setRole] = useState<UserRole>('consumer')
  const [summary, setSummary] = useState('')
  const [isPending, startTransition] = useTransition()

  const getSummary = (selectedRole: UserRole) => {
    const input: SummarizeHarvestDetailsInput = {
      ...batchData,
      userRole: selectedRole,
    }
    startTransition(async () => {
      const result = await summarizeHarvestDetails(input)
      setSummary(result.summary)
    })
  }

  useEffect(() => {
    getSummary(role)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
    getSummary(newRole)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="text-primary" />
              AI-Powered Summary
            </CardTitle>
            <CardDescription>A quick overview of this batch, tailored for you.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="role-select" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              View as:
            </label>
            <Select value={role} onValueChange={(value) => handleRoleChange(value as UserRole)}>
              <SelectTrigger id="role-select" className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consumer">Consumer</SelectItem>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="processor">Processor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-sm text-foreground">{summary}</p>
        )}
      </CardContent>
    </Card>
  )
}
