import { useState } from "react";

import PhoneLogin from "./PhoneLogin";
import OtpInputs from "./OtpInputs";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import { useSendCode } from "./useSendCode";
import { useVerifySmsAuth } from "./useSmsAuth";

function Login({ onCloseModal }) {
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
      className="flex h-full w-full flex-col justify-evenly gap-8 p-8 md:py-4 md:w-96"
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
