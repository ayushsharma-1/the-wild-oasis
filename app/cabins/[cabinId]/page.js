import Image from "next/image";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="grid md:grid-cols-[3fr_4fr] gap-10 lg:gap-20 border border-primary-800 py-6 md:py-8 px-6 md:px-10 mb-16 lg:mb-24 shadow-xl rounded-lg overflow-hidden">
        <div className="relative h-[300px] md:h-auto md:scale-[1.15] md:-translate-x-3">
          <Image
            src={image}
            fill
            className="object-cover rounded-md"
            alt={`Cabin ${name}`}
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-accent-100 font-black text-5xl md:text-6xl lg:text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 p-4 md:p-6 md:pb-1 md:w-[150%] rounded-md shadow-lg">
            Cabin {name}
          </h3>

          <p className="text-base md:text-lg text-primary-300 mb-8 md:mb-10 leading-relaxed">{description}</p>

          <ul className="flex flex-col gap-3 md:gap-4 mb-7 bg-primary-950/50 p-4 md:p-6 rounded-lg border border-primary-800">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                For up to <span className="font-bold text-accent-400">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold text-accent-400">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                Privacy <span className="font-bold text-accent-400">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 md:mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <div className="grid md:grid-cols-2 border border-primary-800 min-h-[400px] shadow-xl rounded-lg overflow-hidden">
            <DateSelector/>
            <ReservationForm/>
        </div>
      </div>
    </div>
  );
}
