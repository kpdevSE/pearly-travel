import Image from "next/image";
import { HiUser } from "react-icons/hi2";

export default function CarListItem({ car, distance }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between mt-5">
          <Image src={car.image} width={100} height={100} alt="car" />
          <div>
            <h2 className="font-semibold text-[18px] flex gap-3">
              {car.name}
              <span className="flex gap-2 items-center font-normal text-[14px]">
                <HiUser />
                {car.seat}
              </span>
            </h2>
            <p>{car.desc}</p>
          </div>
        </div>
        <h2 className="text-[18px] font-semibold">
          ${(car.amount * distance).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}
