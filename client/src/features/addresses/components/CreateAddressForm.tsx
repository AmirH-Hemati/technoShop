import { useForm } from "react-hook-form";
import Button from "../../../ui/Button.js";
import FormRow from "../../../ui/FormRow.js";

import type { Address } from "../types/address.js";
import Input from "@/ui/Input.js";
import { useCreateAddress } from "../hooks/useCreateAddress.js";
import { useUpdateAddress } from "../hooks/useUpdateAddress.js";

type Props = { onCloseModal?: () => void; address?: Address | {} };

function CreateAddressForm({ onCloseModal, address = {} }: Props) {
  const { createAddress, isCreateing } = useCreateAddress();
  const { updateAddress, isUpdating } = useUpdateAddress();

  const { _id: editId, ...editValues } = address;
  const isWorking = isCreateing || isUpdating;
  const isEditSession = Boolean(editId);
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data: Omit<Address, "isDefault">) {
    if (isEditSession) {
      updateAddress({ newAddress: data, id: editId });
    } else {
      createAddress(
        { ...data, isDefault: false },
        {
          onSettled: () => {
            // reset();
            // onCloseModal?.();
          },
        },
      );
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-8 rounded-xl p-8"
    >
      <FormRow label="عنوان آدرس" error={errors?.title?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="title"
          placeholder="مثلاً: منزل، محل کار، دفتر شرکت"
          {...register("title", { required: "این فیلد ضروری است" })}
        />
      </FormRow>

      <FormRow label="شهر" error={errors?.city?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="city"
          placeholder="مثلاً: تهران"
          {...register("city", { required: "این فیلد ضروری است" })}
        />
      </FormRow>

      <FormRow label="کد پستی" error={errors?.postalCode?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="postalCode"
          placeholder="مثلاً: 1234567890"
          {...register("postalCode", { required: "این فیلد ضروری است" })}
        />
      </FormRow>

      <FormRow label="آدرس کامل" error={errors?.addressLine?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="addressLine"
          placeholder="مثلاً: خیابان ولیعصر، کوچه ۱۲، پلاک ۸"
          {...register("addressLine", { required: "این فیلد ضروری است" })}
        />
      </FormRow>

      <div className="mt-4 flex justify-end gap-3">
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

        <Button disabled={isWorking}>اضافه کردن آدرس</Button>
      </div>
    </form>
  );
}

export default CreateAddressForm;
