import Input from "../../ui/Input";

function PhoneLogin({ setPhoneNumber, phoneNumber }) {
  return (
    <div className="space-y-4 lg:space-y-2">
      <p className="text-sm leading-normal font-normal">
        شماره موبایل خود را وارد کنید
      </p>

      <Input
        placeholder="09xxxxxxxxx"
        type="number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rules"
          className="accent-primary focus:ring-primary h-4 w-4 rounded-md border-none outline-none focus:ring-2 focus:ring-offset-2 lg:h-3 lg:w-3"
        />
        <label htmlFor="rules" className="cursor-pointer text-xs select-none">
          با ورود و ثبت‌نام در سایت، با
          <span className="text-primary cursor-pointer">قوانین تکنوشاپ</span>
          موافقت می‌کنم.
        </label>
      </div>
    </div>
  );
}

export default PhoneLogin;
