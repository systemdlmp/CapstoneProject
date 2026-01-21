/**
 * Mock Data for Frontend-Only Version
 * Provides sample data for map, lots, and other pages
 */

// Sample gardens data
export const mockGardens = [
  { id: 1, name: 'Hope Garden', area: 1600, description: 'Main cemetery garden' },
  { id: 2, name: 'Peace Garden', area: 800, description: 'Secondary garden' }
];

// Sample sectors
export const mockSectors = [
  { id: 1, garden_id: 1, name: 'A' },
  { id: 2, garden_id: 1, name: 'B' },
  { id: 3, garden_id: 2, name: 'C' },
  { id: 4, garden_id: 2, name: 'D' }
];

// Sample blocks
export const mockBlocks = [
  { id: 1, sector_id: 1, block_number: 1, description: 'Block A1' },
  { id: 2, sector_id: 1, block_number: 2, description: 'Block A2' },
  { id: 3, sector_id: 2, block_number: 1, description: 'Block B1' },
  { id: 4, sector_id: 3, block_number: 1, description: 'Block C1' }
];

// Sample lots
export const mockLots = [
  { id: 1, block_id: 1, lot_number: 1, status: 'available', customer_id: null },
  { id: 2, block_id: 1, lot_number: 2, status: 'occupied', customer_id: 1 },
  { id: 3, block_id: 1, lot_number: 3, status: 'reserved', customer_id: 2 },
  { id: 4, block_id: 2, lot_number: 1, status: 'available', customer_id: null },
  { id: 5, block_id: 2, lot_number: 2, status: 'occupied', customer_id: 3 },
  { id: 6, block_id: 3, lot_number: 1, status: 'available', customer_id: null },
  { id: 7, block_id: 4, lot_number: 1, status: 'available', customer_id: null }
];

// Sample dashboard stats
export const mockDashboardStats = {
  total_lots: 150,
  available_lots: 65,
  occupied_lots: 60,
  reserved_lots: 25,
  total_customers: 45,
  total_revenue: 2250000,
  this_month_revenue: 150000
};

// Sample activity logs
export const mockActivityLogs = [
  { id: 1, user: 'Admin User', action: 'Created lot', details: 'Lot A1-001', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, user: 'Admin User', action: 'Updated customer', details: 'John Doe', timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 3, user: 'Admin User', action: 'Created payment', details: 'Payment #P001', timestamp: new Date(Date.now() - 10800000).toISOString() },
];

// Sample map UI config
export const mockMapUIConfig = {
  center_lat: 14.5995,
  center_lng: 120.9842,
  default_zoom: 15,
  max_zoom: 20,
  min_zoom: 10
};

// Sample map markers (infrastructure)
export const mockMapMarkers = {
  points: [
    { lat: 14.5995, lng: 120.9842, label: 'Main Gate', type: 'gate' },
    { lat: 14.6005, lng: 120.9852, label: 'Office', type: 'office' },
    { lat: 14.5985, lng: 120.9832, label: 'Chapel', type: 'chapel' }
  ]
};

// Sample sector paths for mapping
export const mockSectorPaths = {
  'A': [
    { lat: 14.5990, lng: 120.9840 },
    { lat: 14.6000, lng: 120.9840 },
    { lat: 14.6000, lng: 120.9850 },
    { lat: 14.5990, lng: 120.9850 }
  ],
  'B': [
    { lat: 14.5990, lng: 120.9850 },
    { lat: 14.6000, lng: 120.9850 },
    { lat: 14.6000, lng: 120.9860 },
    { lat: 14.5990, lng: 120.9860 }
  ]
};

/**
 * Mock function to get lots by sector
 */
export const mockGetLotsBySector = (garden, sector) => {
  return mockLots.filter(lot => {
    const block = mockBlocks.find(b => b.id === lot.block_id);
    const sectorRecord = mockSectors.find(s => s.id === block?.sector_id);
    const gardenRecord = mockGardens.find(g => g.id === sectorRecord?.garden_id);
    return gardenRecord?.name === garden && sectorRecord?.name === sector;
  });
};

/**
 * Mock function to get sectors by garden
 */
export const mockGetSectorsByGarden = (garden) => {
  const gardenRecord = mockGardens.find(g => g.name === garden);
  return mockSectors.filter(s => s.garden_id === gardenRecord?.id);
};

/**
 * Mock function to get blocks by sector
 */
export const mockGetBlocksBySector = (garden, sector) => {
  const gardenRecord = mockGardens.find(g => g.name === garden);
  const sectorRecord = mockSectors.find(s => s.name === sector && s.garden_id === gardenRecord?.id);
  return mockBlocks.filter(b => b.sector_id === sectorRecord?.id);
};
