import { getAccommodationById } from '@/db/queries/accommodation';

export default async function AccommodationDetails({
  params,
}: {
  params: { id: string };
}) {
  let accommodationDetails = await getAccommodationById(Number(params.id));

  return (
    <div>
      AccommodationDetails - {accommodationDetails[0].accommodation.name}
    </div>
  );
}
