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
    <li className="border-grey-200 bg-grey-0 flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center">
      <div className="h-55 w-full overflow-hidden rounded-lg md:w-64">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="z-10 h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>

      <div className="text-200 text-grey-600 flex-1 space-y-3 font-medium">
        <div className="flex items-start justify-between">
          <h3 className="text-400 text-grey-900">آدرس {index + 1}</h3>
          <CloseSquare className="text-grey-500 cursor-pointer" />
        </div>

        <div className="flex items-start gap-1">
          <Location size="20" className="text-red-500" />
          <p className="flex-1">{address?.fullAddress}</p>
        </div>
        <div className="flex items-start gap-1">
          <Global size="20" className="text-red-500" />
          <p>
            {address?.province}، {address?.city}
          </p>
        </div>

        <div className="flex items-start gap-1">
          <SmsEdit size="20" className="text-red-500" />
          <p>{address?.postalCode}</p>
        </div>

        <div className="flex items-start gap-1">
          <Call size="20" className="text-red-500" />
          <p> {address?.recipientName}</p>
        </div>

        <div className="flex items-start gap-1">
          <User size="18" className="text-red-500" />
          <p> {address?.recipientPhone}</p>
        </div>
      </div>
    </li>
  );
}

export default Address;

// <div>
//   {checkBox ? (
//     <CheckBox
//       checked={selectedAddress?._id === address?._id}
//       onChange={() => onSelectAddress(address)}
//     />
//   ) : (
//     <Location className="text-primary" />
//   )}
// </div>
