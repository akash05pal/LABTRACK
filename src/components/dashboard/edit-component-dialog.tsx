
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Component, ComponentCategory } from "@/lib/types";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const categories: ComponentCategory[] = ['Fencing', 'Gates', 'Hardware', 'Materials', 'Tools', 'Other'];

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  partNumber: z.string().min(1, "Part number is required."),
  quantity: z.coerce.number().int().min(0, "Quantity cannot be negative."),
  location: z.string().min(1, "Location is required."),
  category: z.enum(categories),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
  unitPrice: z.coerce.number().min(0).optional(),
  datasheetUrl: z.string().url().optional().or(z.literal('')),
  lowStockThreshold: z.coerce.number().int().min(0, "Threshold cannot be negative."),
});

type FormValues = z.infer<typeof formSchema>;

interface EditComponentDialogProps {
    component: Component;
    onUpdateComponent: (component: Component) => void;
    onClose: () => void;
}

export function EditComponentDialog({ component, onUpdateComponent, onClose }: EditComponentDialogProps) {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: component,
  });

  useEffect(() => {
    form.reset(component);
  }, [component, form]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedComponent: Component = {
        ...component,
        ...data,
        manufacturer: data.manufacturer || 'N/A',
        description: data.description || 'No description',
        unitPrice: data.unitPrice || 0,
        datasheetUrl: data.datasheetUrl || '#',
    };
    onUpdateComponent(updatedComponent);
    toast({
        title: "Item Updated",
        description: `${data.name} has been updated.`,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update the details for {component.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="partNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                  <FormLabel className="text-right">Part #</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                   <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                  <FormLabel className="text-right">Quantity</FormLabel>
                  <FormControl className="col-span-3">
                    <Input type="number" {...field} />
                  </FormControl>
                   <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="lowStockThreshold"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                  <FormLabel className="text-right">Low Stock At</FormLabel>
                  <FormControl className="col-span-3">
                    <Input type="number" {...field} />
                  </FormControl>
                   <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                  <FormLabel className="text-right">Location</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                   <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                  <FormLabel className="text-right">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="col-span-3">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                             {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                   <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
            
            <DialogFooter className="col-span-4 !justify-between mt-4">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
