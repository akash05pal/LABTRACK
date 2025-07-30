"use client";

import { useIsMobile } from '@/hooks/use-mobile';
import type { Component } from '@/lib/types';
import ComponentTable from './component-table';
import ComponentCards from './component-cards';

interface InventoryViewProps {
  components: Component[];
}

export default function InventoryView({ components }: InventoryViewProps) {
  const isMobile = useIsMobile();
  // In a real app, filtering logic would be implemented here using useState and useEffect
  // For this UI-focused implementation, we pass all components down
  const filteredComponents = components;

  if (isMobile === undefined) {
    // Skeleton loader while determining screen size
    return (
      <div className="space-y-4">
        <div className="h-24 w-full rounded-lg bg-muted animate-pulse" />
        <div className="h-24 w-full rounded-lg bg-muted animate-pulse" />
        <div className="h-24 w-full rounded-lg bg-muted animate-pulse" />
      </div>
    );
  }

  return isMobile ? (
    <ComponentCards components={filteredComponents} />
  ) : (
    <ComponentTable components={filteredComponents} />
  );
}
