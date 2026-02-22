import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import { Check, X } from "lucide-react";

import { useGeolocation } from "@/hooks/useGeolocation.js";
import { Button } from "@/components/ui/button.js";
import "leaflet/dist/leaflet.css";

type Position = { lat: number; lng: number };
type SetPosition = Dispatch<SetStateAction<Position>>;

type Props = {
  position: Position;
  setPosition: SetPosition;
  onNext: () => void;
  onCloseModal: () => void;
};

export default function MapStep({
  setPosition,
  position,
  onNext,
  onCloseModal,
}: Props) {
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
      <div className="flex items-center justify-between px-4 pt-4">
        <p className="text-200 font-medium">
          موقعیت مکانی مورد نظر خود را روی نقشه پیدا کنید
        </p>
        <Button variant="ghost" size="icon-sm" onClick={onCloseModal}>
          <X />
        </Button>
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
          className="h-full w-full"
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
