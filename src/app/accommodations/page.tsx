import { AccommodationCard } from '@/components/AccommodationCard';
import { getAccommodation } from '@/db/queries/accommodation';

export default async function Home() {
  // get the accommodations
  let accommodations = await getAccommodation();
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-6'>
      <div className='container-xl m-auto px-4 py-6 lg:container'>
        {accommodations.length === 0 ? (
          <p>No accommodations found</p>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {accommodations.map((accommodation) => (
              <div key={accommodation.accommodation.id}>
                <AccommodationCard
                  accommodation={accommodation.accommodation}
                  user={accommodation.user!}
                  images={accommodation.images!}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
