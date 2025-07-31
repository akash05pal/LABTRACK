import type { Component, LogEntry } from './types';
import { subDays } from 'date-fns';

export const mockComponents: Component[] = [
  {
    id: '1',
    name: '6ft Cedar Fence Panel',
    manufacturer: 'A1 Supplies',
    partNumber: 'A1-CFP-6',
    description: 'Standard 6-foot tall cedar privacy fence panel.',
    quantity: 120,
    location: 'Yard A, Bay 3',
    unitPrice: 75.5,
    datasheetUrl: '#',
    category: 'Fencing',
    lowStockThreshold: 20,
    lastOutwardDate: subDays(new Date(), 5).toISOString(),
  },
  {
    id: '2',
    name: '5in Black Gate Hinge (2-pack)',
    manufacturer: 'Hardy Hardware',
    partNumber: 'HH-BGH-5',
    description: 'Heavy-duty black steel hinges for gates.',
    quantity: 15,
    location: 'Warehouse, Shelf B4',
    unitPrice: 12.99,
    datasheetUrl: '#',
    category: 'Hardware',
    lowStockThreshold: 30,
    lastOutwardDate: subDays(new Date(), 120).toISOString(),
  },
  {
    id: '3',
    name: '80lb Bag of Concrete Mix',
    manufacturer: 'Quick-Set',
    partNumber: 'QS-CM-80',
    description: 'Fast-setting concrete mix for posts.',
    quantity: 250,
    location: 'Yard B, Pallet 12',
    unitPrice: 8.75,
    datasheetUrl: '#',
    category: 'Materials',
    lowStockThreshold: 100,
    lastOutwardDate: subDays(new Date(), 30).toISOString(),
  },
  {
    id: '4',
    name: '12ft Walk-Through Gate',
    manufacturer: 'A1 Gates',
    partNumber: 'A1-WTG-12',
    description: '12-foot wide single-swing walk-through gate, steel.',
    quantity: 8,
    location: 'Yard C, Section 2',
    unitPrice: 455.0,
    datasheetUrl: '#',
    category: 'Gates',
    lowStockThreshold: 5,
    lastOutwardDate: subDays(new Date(), 150).toISOString(),
  },
  {
    id: '5',
    name: 'Post Hole Digger',
    manufacturer: 'ToolTime',
    partNumber: 'TT-PHD-01',
    description: 'Manual post hole digger with fiberglass handles.',
    quantity: 3,
    location: 'Tool Shed',
    unitPrice: 45.0,
    datasheetUrl: '#',
    category: 'Tools',
    lowStockThreshold: 4,
    lastOutwardDate: subDays(new Date(), 25).toISOString(),
  },
  {
    id: '6',
    name: '4x4x8 Pressure-Treated Post',
    manufacturer: 'Lumber Inc.',
    partNumber: 'LI-PTP-448',
    description: '8-foot long pressure-treated 4x4 post.',
    quantity: 0,
    location: 'Yard A, Bay 5',
    unitPrice: 18.25,
    datasheetUrl: '#',
    category: 'Materials',
    lowStockThreshold: 50,
    lastOutwardDate: subDays(new Date(), 200).toISOString(),
  },
  {
    id: '7',
    name: 'Solar Post Cap Light (4-pack)',
    manufacturer: 'GlowRight',
    partNumber: 'GR-SPC-4PK',
    description: 'Solar-powered LED lights for 4x4 posts.',
    quantity: 40,
    location: 'Warehouse, Shelf C1',
    unitPrice: 29.99,
    datasheetUrl: '#',
    category: 'Hardware',
    lowStockThreshold: 15,
    lastOutwardDate: subDays(new Date(), 10).toISOString(),
  },
];


const generateLogs = (): LogEntry[] => {
  const logs: LogEntry[] = [];
  const users = [
    { name: 'Admin User', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Tech User', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Researcher User', avatar: 'https://placehold.co/40x40.png' },
  ];
  
  for (let i = 0; i < 30; i++) {
    const component = mockComponents[i % mockComponents.length];
    const user = users[i % users.length];
    const inwardQty = Math.floor(Math.random() * 20) + 5;
    const outwardQty = Math.floor(Math.random() * 10) + 1;

    // Inward
    logs.push({
      id: `log-in-${i}`,
      user,
      action: 'Added',
      componentName: component.name,
      componentId: component.id,
      timestamp: subDays(new Date(), i).toISOString(),
      details: `Added ${inwardQty} units.`,
      quantity: inwardQty,
    });
    
    // Outward (for some)
    if (i % 2 === 0) {
       logs.push({
        id: `log-out-${i}`,
        user,
        action: 'Issued',
        componentName: component.name,
        componentId: component.id,
        timestamp: subDays(new Date(), i).toISOString(),
        details: `Issued ${outwardQty} units for a project.`,
        quantity: outwardQty,
      });
    }
  }
  return logs;
}


export const mockLogs: LogEntry[] = generateLogs();
