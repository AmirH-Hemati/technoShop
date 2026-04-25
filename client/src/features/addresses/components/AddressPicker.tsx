import { useState } from "react";
import MapStep from "./MapStep.js";
import AddressForm from "./AddressForm.js";

export default function AddressPicker() {
  const [step, setStep] = useState(1);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  function handelNextStep() {
    if (!position) return;
    setStep(2);
  }
  return (
    <div className="h-full w-full">
      {step === 1 && (
        <MapStep
          setPosition={setPosition}
          position={position}
          onNext={handelNextStep}
        />
      )}

      {step === 2 && (
        <AddressForm position={position} onBack={() => setStep(1)} />
      )}
    </div>
  );
}
