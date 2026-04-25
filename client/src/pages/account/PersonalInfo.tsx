import Heading from "@/ui/Heading.js";
import UpdateUserDataForm from "../../features/authentication/components/UpdateUserDataForm.js";
import BackButton from "@/ui/BackButton.js";

function PersonalInfo() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BackButton />
          <Heading type="h2">اطلاعات فردی</Heading>{" "}
        </div>
        <p className="text-300 text-grey-600">هویت خود را تأیید کنید</p>
      </div>

      <UpdateUserDataForm />
    </div>
  );
}

export default PersonalInfo;
