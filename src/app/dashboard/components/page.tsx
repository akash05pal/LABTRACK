
"use client";

import { useState } from 'react';
import InventoryView from '@/components/dashboard/inventory-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockComponents as initialComponents } from '@/lib/mock-data';
import type { Component, ComponentCategory } from '@/lib/types';
import { Plus, Search } from 'lucide-react';
import { AddComponentDialog } from '@/components/dashboard/add-component-dialog';

const categories: ComponentCategory[] = ['Resistors', 'Capacitors', 'ICs', 'Sensors', 'Dev Boards', 'Other'];
const locations = Array.from(new Set(initialComponents.map(c => c.location)));

export default function ComponentsPage() {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  
  const handleAddComponent = (newComponent: Omit<Component, 'id' | 'lastOutwardDate'>) => {
    const componentToAdd: Component = {
        ...newComponent,
        id: (components.length + 1).toString(),
        lastOutwardDate: new Date().toISOString(),
    };
    setComponents(prev => [componentToAdd, ...prev]);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <h1 className="text-2xl font-bold">Components</h1>
        <AddComponentDialog onAddComponent={handleAddComponent} />
      </header>
      <div className="p-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, part #..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock Levels</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <main className="flex-1 overflow-auto p-4">
        <InventoryView components={components} />
      </main>
    </div>
  );
}
