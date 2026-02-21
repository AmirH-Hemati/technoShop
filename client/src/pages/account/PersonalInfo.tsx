import Heading from "@/ui/Heading.js";
import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm.js";

function PersonalInfo() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Heading type="h2">اطلاعات فردی</Heading>
        <p className="text-300 text-grey-600">هویت خود را تأیید کنید</p>
      </div>

      <UpdateUserDataForm />
    </div>
  );
}

export default PersonalInfo;
