import { mockBatchData, BatchData, TimelineEvent } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HarvestSummary } from "@/components/harvest-summary"
import { Leaf, MapPin, Calendar, Syringe, Package, Truck, CheckCircle } from "lucide-react"

const stageIcons: { [key in TimelineEvent['stage']]: React.ReactNode } = {
  Harvested: <Leaf className="h-5 w-5" />,
  Processed: <CheckCircle className="h-5 w-5" />,
  Certified: <Syringe className="h-5 w-5" />,
  Packaged: <Package className="h-5 w-5" />,
  'In-Transit': <Truck className="h-5 w-5" />,
  Delivered: <CheckCircle className="h-5 w-5 text-primary" />,
};

const stageColors: { [key in TimelineEvent['stage']]: string } = {
  Harvested: 'bg-green-100 text-green-800',
  Processed: 'bg-blue-100 text-blue-800',
  Certified: 'bg-purple-100 text-purple-800',
  Packaged: 'bg-yellow-100 text-yellow-800',
  'In-Transit': 'bg-orange-100 text-orange-800',
  Delivered: 'bg-primary/10 text-primary',
};


export default function VerifyPage({ params }: { params: { batchId: string } }) {
  const batchData = mockBatchData.find(b => b.batchId === params.batchId)

  if (!batchData) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl">{batchData.herbName}</h1>
        <p className="text-muted-foreground">Batch ID: {batchData.batchId}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>Product Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Image
                        src={batchData.imageUrl}
                        alt={`Image of ${batchData.herbName}`}
                        width={1200}
                        height={800}
                        data-ai-hint={batchData.imageHint}
                        className="rounded-lg object-cover aspect-video"
                    />
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <Leaf className="h-4 w-4 mt-1 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Origin</h3>
                                <p className="text-muted-foreground">{batchData.origin}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="h-4 w-4 mt-1 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Harvest Date</h3>
                                <p className="text-muted-foreground">{new Date(batchData.harvestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 mt-1 text-primary"/>
                            <div>
                                <h3 className="font-semibold">Sustainability</h3>
                                <p className="text-muted-foreground">{batchData.sustainabilityProofs}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
          <HarvestSummary batchData={batchData} />
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Provenance Timeline</CardTitle>
              <CardDescription>The complete journey of this batch from farm to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                 <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>

                <div className="space-y-8">
                  {batchData.timeline.map((event, index) => (
                    <div key={event.id} className="relative flex items-start">
                       <div className="absolute left-0 top-1 h-8 w-8 -translate-x-1/2 rounded-full bg-background flex items-center justify-center border-2">
                         <span className={stageColors[event.stage] + ' p-1 rounded-full'}>
                           {stageIcons[event.stage]}
                         </span>
                       </div>
                       <div className="pl-8 flex-1">
                           <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-md">{event.stage}</h3>
                              <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                           </div>
                           <p className="text-sm text-muted-foreground">{event.details}</p>
                           <div className="mt-2 flex items-center gap-2">
                             <MapPin className="h-3 w-3 text-muted-foreground"/>
                             <p className="text-xs text-muted-foreground">{event.location}</p>
                           </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
