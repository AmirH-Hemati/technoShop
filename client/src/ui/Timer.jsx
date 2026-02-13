import { useEffect, useState } from "react";

const DAY_SECONDS = 86400;

export default function Timer() {
  const [seconds, setSeconds] = useState(DAY_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds <= 1 ? DAY_SECONDS : seconds - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  return (
    <div className="bg-grey-0 my-1 flex items-center justify-evenly rounded-lg py-0.5">
      <div className="border-primary flex flex-col items-center border-l px-2">
        <span className="text-primary text-base font-medium">
          {String(second).padStart(2, "0")}
        </span>
        <span className="text-primary text-xs font-normal">ثانیه</span>
      </div>

      <div className="border-primary flex flex-col items-center border-l px-2">
        <span className="text-primary text-base font-medium">
          {String(minutes).padStart(2, "0")}
        </span>
        <span className="text-primary text-xs font-normal">دقیقه</span>
      </div>

      <div className="flex flex-col items-center px-2">
        <span className="text-primary text-base font-medium">
          {String(hours).padStart(2, "0")}
        </span>
        <span className="text-primary text-xs font-normal">ساعت</span>
      </div>
    </div>
  );
}
