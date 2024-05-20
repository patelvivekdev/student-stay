"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createAccommodationWithImages } from "@/db/queries/accommodation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  type: z.string(),
  street: z.string().min(2, {
    message: "Street must be at least 2 characters.",
  }),
  // city must be kitchener, waterloo, cambridge
  city: z.string(),
  // zipcode must be 6 digits
  zipcode: z.string().length(6),
  userId: z.string(),
  beds: z.coerce.number().int().gt(0, {
    message: "Beds must be at least 1.",
  }),
  baths: z.coerce.number().int().gt(0, {
    message: "Baths must be at least 1.",
  }),
  price: z.coerce.number().int().gt(0, {
    message: "Price must be at least 1.",
  }),
});

export default function AddForm({ userId }: { userId: string }) {
  const [resource, setResource] = useState<any>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      street: "",
      city: "",
      zipcode: "",
      beds: Number(1),
      baths: Number(1),
      price: Number(100),
      userId: userId,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createAccommodationWithImages(values, resource);
    toast.success("Accommodation added successfully");
    // reset the form
    form.reset();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);
    if (files.length > 10) {
      toast.error("You can only upload 10 images.");
      return;
    }
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      setResource(formData);
    }
  };

  return (
    <section className="min-h-screen py-4 flex flex-col mx-auto w-3/4">
      <h1 className="text-4xl font-bold mb-4">Add accommodation</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="House near walmart, Cambridge"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Add name of location.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A beautiful house near walmart. "
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add a short description about location.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="House" {...field} />
                </FormControl>
                <FormDescription>Apartment | House | Condo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="000 Street" {...field} />
                </FormControl>
                <FormDescription>Add street of location.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Cambridge" {...field} />
                  {/* <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        value="kitchener"
                        checked={field.value === "kitchener"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Kitchener
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="waterloo"
                        checked={field.value === "waterloo"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Waterloo
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="cambridge"
                        checked={field.value === "cambridge"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Cambridge
                    </label>
                  </div> */}
                </FormControl>
                <FormDescription>Cambridge | Kitchener</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zipcode</FormLabel>
                <FormControl>
                  <Input placeholder="zipcode of location" {...field} />
                </FormControl>
                <FormDescription>N1E1C2</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="beds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beds</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2" {...field} />
                </FormControl>
                <FormDescription>Add number of beds.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baths</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2" {...field} />
                </FormControl>
                <FormDescription>Add number of baths.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>$100 per month.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="flex flex-col gap-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
