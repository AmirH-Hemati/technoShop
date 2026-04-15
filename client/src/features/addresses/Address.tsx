import { MapContainer, TileLayer, Marker } from "react-leaflet";
import {
  Call,
  CloseSquare,
  Global,
  Location,
  SmsEdit,
  User,
} from "iconsax-reactjs";

import type { AddressType } from "./types/address.js";
import { useCheckout } from "@/context/CheckoutCartContext.js";

import styles from "./address.module.css";
import { cn } from "@/lib/utils.js";

type Props = {
  index: number;
  address: AddressType;
  checkBox: boolean;
};

function Address({ index, address, checkBox = true }: Props) {
  const { selectedAddress, onSelectAddress } = useCheckout();

  const position: [number, number] = [
    address?.lat || 35.6892,
    address?.lng || 51.389,
  ];

  return (
    <li
      className={cn(
        styles["address-area"],
        "text-200 cursor-pointer gap-2 rounded-md border p-3 md:p-4",
        selectedAddress?._id === address._id &&
          "bg-grey-50 border-primary border",
      )}
      onClick={() => onSelectAddress(address)}
    >
      <div className="z-10 h-full bg-red-500 w-32 overflow-hidden rounded-lg [grid-area:map] md:w-64">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>

      <div className="flex items-start justify-between [grid-area:title]">
        <h3 className="text-300 text-grey-900 flex-1 font-semibold">
          آدرس {index + 1}
        </h3>
        <CloseSquare size={18} />
      </div>

      <div className="flex items-start gap-1 [grid-area:fullAddress]">
        <Location size="20" className="shrink-0 text-red-500" />
        <span className="font-medium">{address.fullAddress}</span>
      </div>

      <div className="flex items-center gap-1 [grid-area:province]">
        <Global size="18" className="text-red-500" />
        <span>
          {address.province}, {address.city}
        </span>
      </div>

      <div className="flex items-center gap-1 [grid-area:postcode]">
        <SmsEdit size="18" className="text-red-500" />
        <span>{address.postalCode}</span>
      </div>

      <div className="flex items-center gap-1 [grid-area:name]">
        <Call size="18" className="text-red-500" />
        <span>{address.recipientName}</span>
      </div>

      <div className="flex items-center gap-1 [grid-area:phone]">
        <User size="18" className="text-red-500" />
        <span>{address.recipientPhone}</span>
      </div>
    </li>
  );
}

export default Address;
