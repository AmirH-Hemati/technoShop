import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";
import BackButton from "../../ui/BackButton";

function PersonalInfo() {
  return (
    <div className="space-y-5">
      <BackButton />
      <UpdateUserDataForm />
    </div>
  );
}

export default PersonalInfo;
