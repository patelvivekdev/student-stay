import { AccommodationCard } from "@/components/AccommodationCard";
import { getAccommodation } from "@/db/queries/accommodation";

export default async function Home() {
  // get the accommodations
  let accommodations = await getAccommodation();
  return (
    <div className="min-h-screen bg-gray-100 mx-auto px-4 py-6 flex flex-col items-center justify-center">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {accommodations.length === 0 ? (
          <p>No accommodations found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
