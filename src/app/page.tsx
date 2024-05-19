import { AccommodationCard } from "@/components/AccommodationCard"
import { getAccommodation } from "@/db/queries/accommodation"

export default async function Home() {
	// get the accommodations
	let accommodations = await getAccommodation()
	return (
		<div className="min-h-screen bg-gray-100 mx-auto flex flex-col items-center justify-center">
			<div className="flex flex-wrap justify-center gap-4">
				{accommodations.map((accommodation) => (
					<div key={accommodation.accommodation.id}>
						<AccommodationCard accommodation={accommodation.accommodation} user={accommodation.user} />
					</div>
				))}
			</div>
		</div>
	)
}
