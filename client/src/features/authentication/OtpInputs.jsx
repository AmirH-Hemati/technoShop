import { useEffect, useRef, useState } from "react";

function OtpInputs({ length, onChangeOtp, setShowOtpInput }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const ref = useRef([]);

  useEffect(() => {
    if (ref?.current[0]) {
      ref.current[0].focus();
    }
  }, []);

  function handelOnchange(e, index) {
    const { value } = e.target;
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < length - 1 && value && ref.current[index + 1]) {
      ref.current[index + 1].focus();
    }

    onChangeOtp(newOtp.join(""));
  }
  function handelBackSpace(e, index) {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        onChangeOtp(newOtp.join(""));
        return;
      }

      if (index > 0 && ref.current[index - 1]) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        ref.current[index - 1].focus();
        onChangeOtp(newOtp.join(""));
      }

      onChangeOtp(newOtp.join(""));
    }
  }
  return (
    <div className="space-y-2" s>
      <p className="text-sm leading-normal font-normal">
        کد تایید را وارد کنید .{" "}
      </p>
      <div
        className="ltr flex items-center justify-center gap-4"
        style={{ direction: "ltr" }}
      >
        {otp.map((element, index) => (
          <input
            key={index}
            type="text"
            ref={(input) => (ref.current[index] = input)}
            maxLength={1}
            onChange={(e) => handelOnchange(e, index)}
            onKeyDown={(e) => handelBackSpace(e, index)}
            className="bg-grey-100 focus:ring-primary h-13 w-13 rounded-lg border border-none text-center outline-none focus:ring-2 focus:ring-offset-1"
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-grey-700 text-xs">زمان باقی مانده 1:23</p>

        <p
          onClick={() => setShowOtpInput(false)}
          className="text-primary cursor-pointer text-xs"
        >
          ویرایش شماره موبایل
        </p>
      </div>
    </div>
  );
}

export default OtpInputs;
