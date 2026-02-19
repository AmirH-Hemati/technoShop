import { useState } from "react";

import PhoneLogin from "./PhoneLogin.js";

import Logo from "@/ui/Logo.js";
import Button from "@/ui/Button.js";
import { useVerifySmsAuth } from "./useSmsAuth.js";
import { useSendCode } from "./useSendCode.js";
import OtpInputs from "./OtpInputs.js";

function Login({ onCloseModal }: { onCloseModal?: () => void }) {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { sendCode, isSending } = useSendCode();
  const { verifyCode, isVerifying } = useVerifySmsAuth();

  const handelChangeOtp = setOtp;

  function handelSubmit(e) {
    e.preventDefault();

    if (!showOtpInput) {
      sendCode(phoneNumber);
      setShowOtpInput(true);
    } else {
      verifyCode({ phoneNumber, verificationCode: otp });
      onCloseModal();
    }
  }

  return (
    <form
      onSubmit={handelSubmit}
      className="flex h-full w-full flex-col justify-evenly gap-8 p-8 md:w-96 md:py-4"
    >
      <div className="mx-auto">
        <Logo />
      </div>

      <p className="text-tint-4 -mt-4 text-center text-lg font-medium">
        ورود / ثبت نام
      </p>

      {!showOtpInput ? (
        <PhoneLogin setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber} />
      ) : (
        <OtpInputs
          onChangeOtp={handelChangeOtp}
          length={5}
          setShowOtpInput={setShowOtpInput}
        />
      )}

      <Button size="large">تایید</Button>
    </form>
  );
}

export default Login;
