import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Spinner from "../../ui/Spinner";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { register, getValues, handleSubmit, formState } = useForm();

  const { errors } = formState;
  if (isLoading) return <Spinner />;
  const { phone, name, email } = user;

  function onSubmit(data) {
    const image = typeof data.photo === "string" ? data.photo : data.photo[0];

    const formData = new FormData();
    for (const key in data) {
      if (key === "photo") {
        formData.append("photo", image);
      }
      formData.append(key, data[key]);
    }

    updateUser(formData);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-grey-0 shadow-2 mb-20 flex h-full flex-col gap-8 rounded-xl border border-gray-300 px-4 py-8 md:mb-0 lg:p-4"
    >
      <FormRow label="شماره تلفن">
        <Input id="email" type="text" value={phone} disabled />
      </FormRow>
      <FormRow label="ایمیل" error={errors?.email?.message}>
        <Input
          id="email"
          type="email"
          value={email}
          {...register("email", { required: "این فیلد الزامی است" })}
        />
      </FormRow>
      <FormRow label="نام و نام خانوادگی" error={errors?.name?.message}>
        <Input
          id="name"
          type="text"
          value={name}
          {...register("name", { required: "این فیلد الزامی است" })}
        />
      </FormRow>

      <FormRow label="عکس آواتار" error={errors?.photo?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          {...register("photo", { required: "این فیلد الزامی است" })}
        />
      </FormRow>

      <div className="mt-4 mr-auto flex items-center gap-4">
        <Button type="reset" variation="secondary">
          لغو
        </Button>
        <Button>ذخیره کردن تغییرات</Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
