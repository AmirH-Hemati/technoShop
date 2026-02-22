import { useEffect, useState } from "react";
import axios from "axios";

export default function AddressForm({ position, onBack }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!position) return;

    const fetchAddress = async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              lat: position.lat,
              lon: position.lng,
              format: "json",
            },
          },
        );

        setAddress(res.data.display_name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAddress();
  }, [position]);

  return (
    <div>
      <h2>آدرس شما:</h2>

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2"
      />

      <div className="mt-4 flex gap-2">
        <button onClick={onBack}>بازگشت</button>
        <button className="bg-black px-4 py-2 text-white">ثبت آدرس</button>
      </div>
    </div>
  );
}
