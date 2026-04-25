import { type Dispatch, type SetStateAction, useEffect } from "react";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button.js";
import { DialogClose } from "@/components/ui/dialog.js";

import { useGeolocation } from "@/hooks/useGeolocation.js";

type Position = { lat: number; lng: number } | null;
type SetPosition = Dispatch<SetStateAction<Position>>;

type Props = {
  position: Position;
  setPosition: SetPosition;
  onNext: () => void;
};

export default function MapStep({ setPosition, position, onNext }: Props) {
  const {
    position: geolocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geolocationPosition)
      setPosition({
        lat: geolocationPosition.lat,
        lng: geolocationPosition.lng,
      });
  }, [geolocationPosition]);

  return (
    <div className="relative flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-200 font-medium">
          موقعیت مکانی مورد نظر خود را روی نقشه پیدا کنید
        </p>
        <DialogClose>
          <Button variant="ghost" size="icon-sm">
            <X />
          </Button>
        </DialogClose>
      </div>
      <div className="relative h-[600px] w-full overflow-hidden">
        <Button
          variant="outline"
          onClick={getPosition}
          className="absolute top-2 right-3 z-[9999]"
        >
          {isLoadingPosition ? "درحال بارگزاری..." : "موقعیت مکانی من"}
        </Button>
        <MapContainer
          center={[35.6892, 51.389]}
          zoom={13}
          className="z-[9999] h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeView position={position} />
          <LocationMarker setPosition={setPosition} position={position} />
        </MapContainer>
      </div>

      <Button
        size="icon-lg"
        onClick={onNext}
        className="absolute bottom-4 left-4 z-[9999]"
      >
        <Check />
      </Button>
    </div>
  );
}

function ChangeView({ position }: { position: Position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 15);
    }
  }, [position]);

  return null;
}
function LocationMarker({
  setPosition,
  position,
}: {
  setPosition: SetPosition;
  position: Position;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}
