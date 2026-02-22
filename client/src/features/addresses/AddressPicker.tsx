import { useState } from "react";
import MapStep from "./MapStep.js";
import AddressForm from "./AddressForm.js";

type Props = { onCloseModal?: () => void };
export default function AddressPicker({ onCloseModal }: Props) {
  const [step, setStep] = useState(1);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  return (
    <div className="h-full w-full">
      {step === 1 && (
        <MapStep
          setPosition={setPosition}
          position={position}
          onCloseModal={onCloseModal ?? (() => {})}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <AddressForm position={position} onBack={() => setStep(1)} />
      )}
    </div>
  );
}
