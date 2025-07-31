
import { MoreHorizontal, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Component } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ComponentCardsProps {
  components: Component[];
  onEdit: (component: Component) => void;
  onDelete: (componentId: string) => void;
}

function StockStatusBadge({ quantity, lowStockThreshold }: { quantity: number; lowStockThreshold: number }) {
  if (quantity === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }
  if (quantity < lowStockThreshold) {
    return <Badge variant="secondary" className="bg-amber-500 text-white">Low Stock</Badge>;
  }
  return <Badge variant="default" className="bg-green-500">In Stock</Badge>;
}

export default function ComponentCards({ components, onEdit, onDelete }: ComponentCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {components.map((component) => (
        <Card key={component.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <CardTitle className="text-lg">{component.name}</CardTitle>
                <CardDescription>{component.partNumber}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => onEdit(component)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View Logs</DropdownMenuItem>
                  <a href={component.datasheetUrl} target="_blank" rel="noopener noreferrer">
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Datasheet
                      <ExternalLink className="ml-auto h-3 w-3" />
                    </DropdownMenuItem>
                  </a>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onSelect={() => onDelete(component.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className={cn(
                "font-semibold",
                component.quantity === 0 && "text-destructive",
                component.quantity > 0 && component.quantity < component.lowStockThreshold && "text-amber-600"
              )}>
                {component.quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span>{component.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <Badge variant="outline">{component.category}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Outward</span>
              <span>{format(new Date(component.lastOutwardDate), 'MMM d, yyyy')}</span>
            </div>
          </CardContent>
          <CardFooter>
            <StockStatusBadge quantity={component.quantity} lowStockThreshold={component.lowStockThreshold} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
