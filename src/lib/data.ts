export type TimelineEvent = {
  id: string;
  stage: 'Harvested' | 'Processed' | 'Certified' | 'Packaged' | 'In-Transit' | 'Delivered';
  date: string;
  location: string;
  details: string;
  actor: string;
};

export type BatchData = {
  batchId: string;
  herbName: string;
  origin: string;
  harvestDate: string;
  imageUrl: string;
  imageHint: string;
  testResults: string;
  sustainabilityProofs: string;
  timeline: TimelineEvent[];
};

export const mockBatchData: BatchData[] = [
  {
    batchId: 'HB-ASH-2407-001',
    herbName: 'Ashwagandha',
    origin: 'Neemuch, Madhya Pradesh',
    harvestDate: '2024-07-15',
    imageUrl: 'https://picsum.photos/seed/herb1/1200/800',
    imageHint: 'ashwagandha root',
    testResults: 'Heavy metal analysis: Pass. Microbial count: Within limits. Active constituents (Withanolides): 5.2%.',
    sustainabilityProofs: 'Certified Organic by NPOP. Fair trade practices verified. Geo-tagged sustainable harvesting zone.',
    timeline: [
      {
        id: '1',
        stage: 'Harvested',
        date: '2024-07-15',
        location: 'Neemuch, Madhya Pradesh',
        details: 'Harvested by Sunrise Farms collective. Geo-tag: 24.47° N, 74.88° E. Morning harvest for optimal potency.',
        actor: 'Farmer',
      },
      {
        id: '2',
        stage: 'Processed',
        date: '2024-07-17',
        location: 'Udaipur, Rajasthan',
        details: 'Roots cleaned, dried, and powdered by AyurProcessors Inc. Batch temperature maintained at 45°C during drying.',
        actor: 'Processor',
      },
      {
        id: '3',
        stage: 'Certified',
        date: '2024-07-20',
        location: 'Jaipur, Rajasthan',
        details: 'Lab-tested by QualiHerb Labs. Certificate of Analysis #QA-78910 issued.',
        actor: 'Certifier',
      },
      {
        id: '4',
        stage: 'Packaged',
        date: '2024-07-22',
        location: 'Udaipur, Rajasthan',
        details: 'Packaged in 1kg sealed bags with QR codes generated and applied. Stored in a climate-controlled warehouse.',
        actor: 'Processor',
      },
      {
        id: '5',
        stage: 'In-Transit',
        date: '2024-07-23',
        location: 'Udaipur to Mumbai',
        details: 'Shipped via Green-Mile Logistics. Tracking ID: GML-98765. Refrigerated transport used.',
        actor: 'Logistics',
      },
      {
        id: '6',
        stage: 'Delivered',
        date: '2024-07-25',
        location: 'Mumbai, Maharashtra',
        details: 'Delivered to central distribution hub. Awaiting final retail allocation.',
        actor: 'Distributor',
      },
    ],
  },
];
