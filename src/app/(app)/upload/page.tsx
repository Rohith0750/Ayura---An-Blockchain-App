'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { UploadCloud, LocateFixed, Calendar, Leaf } from "lucide-react"
import { useEffect, useState } from "react"

const formSchema = z.object({
  herbName: z.string().min(2, "Herb name is required."),
  batchId: z.string().min(5, "Batch ID is required."),
  location: z.string().min(1, "Location is required."),
  harvestTime: z.string().min(1, "Harvest time is required."),
  photo: z.any().optional(),
})

export default function UploadPage() {
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      herbName: "Ashwagandha",
      batchId: "",
      location: "Fetching GPS...",
      harvestTime: new Date().toISOString().slice(0, 16),
    },
  })

  const herbName = form.watch("herbName")

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    if(isClient && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          form.setValue("location", `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`)
        },
        (error) => {
          console.error("Error getting location: ", error)
          form.setValue("location", "Could not fetch location")
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not fetch your location. Please ensure you have granted location permissions.",
          })
        }
      )
    }
  }, [isClient, form, toast])

  useEffect(() => {
    if (isClient) {
      const generateBatchId = () => {
        const herbCode = herbName.substring(0, 3).toUpperCase()
        const date = new Date()
        const year = date.getFullYear().toString().slice(-2)
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        return `HB-${herbCode}-${year}${month}${day}-${random}`
      }
      form.setValue("batchId", generateBatchId())
    }
  }, [herbName, form, isClient])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Harvest Data Submitted",
      description: "Your harvest data has been successfully recorded on the blockchain (simulation).",
    })
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Harvest Data</CardTitle>
        <CardDescription>
          Fill in the details below to register a new harvest batch on the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="herbName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Herb Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g., Ashwagandha" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="batchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Generated or manual batch ID" {...field} readOnly />
                    </FormControl>
                    <FormDescription>This ID is automatically generated.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geo-tagged Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LocateFixed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Fetching GPS..." {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="harvestTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harvest Date and Time</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="datetime-local" {...field} className="pl-10" />
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Harvest Photo</FormLabel>
                    <FormControl>
                       <Input type="file" accept="image/*" />
                    </FormControl>
                     <FormDescription>Upload a clear photo of the harvested batch.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit">
              <UploadCloud />
              Submit to Ledger
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
