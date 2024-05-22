import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { SelectAccommodation } from '@/db/schema/accommodation';
import { SelectUser } from '@/db/schema/user';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Bath, Bed, CircleDollarSign, MapPin } from 'lucide-react';

export function AccommodationCard({
  accommodation,
  user,
  images,
}: {
  accommodation: SelectAccommodation;
  user: SelectUser;
  images: string;
}) {
  let image = images.split(',')[0];
  return (
    <Card className='relative mx-auto rounded-xl shadow-md'>
      <Image
        src={image}
        alt=''
        height={0}
        width={0}
        sizes='100vw'
        className='h-auto w-full rounded-t-xl'
      />
      <CardHeader>
        <CardTitle className='text-center font-bold'>
          {accommodation.name}
        </CardTitle>
        <CardDescription>{accommodation.description}</CardDescription>
        <address className='flex flex-row gap-3 text-sm font-semibold'>
          <MapPin /> {accommodation.street} {accommodation.city}{' '}
          {accommodation.zipcode}
        </address>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-row items-center gap-4'>
          <Avatar className='border-2 border-white'>
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback>{user?.name!}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-base'>Email: {user?.email}</p>
            <p className='text-base'>Name: {user?.name}</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='flex flex-row gap-3 text-base font-bold'>
            <Bed />: {accommodation?.beds} bedroom
          </p>
          <p className='flex flex-row gap-3 text-base font-bold'>
            <Bath />: {accommodation?.baths} bathroom
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='flex flex-row gap-3 text-base font-bold'>
            <CircleDollarSign />: ${accommodation?.price} Per Month
          </p>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Link href={`/accommodations/${accommodation.id}`}>
          <Button>Details</Button>
        </Link>
        <Button variant='outline'>Add to Bookmark</Button>
      </CardFooter>
    </Card>
  );
}
