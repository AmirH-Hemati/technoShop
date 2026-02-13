import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";

function CreateCategoryForm({ onCloseModal, category = {} }) {
  const { createCategory, isCreateing } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory();
  const { _id: editId, ...editValues } = category;
  const isWorking = isCreateing || isUpdating;
  const isEditSession = Boolean(editId);
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const formData = new FormData();
    const image = typeof data.image === "string" ? data.image : data.image[0];
    for (const key in data) {
      if (key === "image") {
        formData.append("image", image);
        console.log(image);
      } else {
        formData.append(key, data[key]);
      }
    }
    if (isEditSession) {
      updateCategory({ newCategoryData: formData, id: editId });
    } else {
      createCategory(formData, {
        onSettled: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-grey-300 flex flex-col gap-10 rounded-md border bg-white px-8 py-8"
    >
      <FormRow label={`عنوان دسته بندی`} error={errors?.label?.message}>
        <Input
          type="text"
          id="label"
          {...register("label", { required: "این فیلد ضروری است" })}
        />
      </FormRow>
      <FormRow label="عکس دسته بندی" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "این فیلد ضروری است",
          })}
        />
      </FormRow>
      <div className="mr-auto flex items-center gap-2">
        <Button
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
          variation="secondary"
          type="reset"
        >
          لغو
        </Button>
        <Button>اضافه کردن دسته بندی</Button>
      </div>
    </form>
  );
}

export default CreateCategoryForm;
