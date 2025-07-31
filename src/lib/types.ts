export type ComponentCategory = 'Fencing' | 'Gates' | 'Hardware' | 'Materials' | 'Tools' | 'Other';

export interface Component {
  id: string;
  name: string;
  manufacturer: string;
  partNumber: string;
  description: string;
  quantity: number;
  location: string;
  unitPrice: number;
  datasheetUrl: string;
  category: ComponentCategory;
  lowStockThreshold: number;
  lastOutwardDate: string;
}

export interface LogEntry {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: 'Added' | 'Removed' | 'Updated' | 'Issued';
  componentName: string;
  componentId: string;
  timestamp: string;
  details: string;
  quantity?: number;
}
