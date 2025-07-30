export type ComponentCategory = 'Resistors' | 'Capacitors' | 'ICs' | 'Sensors' | 'Dev Boards' | 'Other';

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
