import * as React from "react";
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SelectAccommodation } from "@/db/schema/accommodation";
import { SelectUser } from "@/db/schema/user";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Bath, Bed, CircleDollarSign, MapPin } from "lucide-react";

export function AccommodationCard({
  accommodation,
  user,
  images
}: {
  accommodation: SelectAccommodation;
  user: SelectUser;
  images: string;
}) {
  let image = images.split(',')[0];
  return (
    <Card className="mx-auto rounded-xl shadow-md relative">
      <Image
        src={image}
        alt=''
        height={0}
        width={0}
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
      />
      <CardHeader>
        <CardTitle className="text-center font-bold">{accommodation.name}</CardTitle>
        <CardDescription>{accommodation.description}</CardDescription>
        <address className="text-sm font-semibold flex flex-row gap-3">
            <MapPin /> {accommodation.street} {accommodation.city} {accommodation.zipcode}
        </address>

      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <Avatar className="border-2 border-white">
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback>{user?.name!}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base">Email: {user?.email}</p>
            <p className="text-base">Name: {user?.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
            <p className="text-base font-bold flex flex-row gap-3"><Bed />: {accommodation?.beds} bedroom</p>
            <p className="text-base font-bold flex flex-row gap-3"><Bath />: {accommodation?.baths} bathroom</p>
        </div>
        <div className="flex flex-col gap-4">
            <p className="text-base font-bold flex flex-row gap-3"><CircleDollarSign />: ${accommodation?.price} Per Month</p>
        </div>

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Message</Button>
        <Button variant="outline">Add to Bookmark</Button>
      </CardFooter>
    </Card>
  );
}
