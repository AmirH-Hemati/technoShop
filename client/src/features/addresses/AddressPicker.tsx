import { useState } from "react";
import MapStep from "./MapStep.js";
import AddressForm from "./AddressForm.js";

export default function AddressPicker({ onCloseModal }) {
  const [step, setStep] = useState(1);
  const [position, setPosition] = useState(null);

  return (
    <div className="h-full w-full">
      {step === 1 && (
        <MapStep
          setPosition={setPosition}
          position={position}
          onCloseModal={onCloseModal}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <AddressForm position={position} onBack={() => setStep(1)} />
      )}
    </div>
  );
}
