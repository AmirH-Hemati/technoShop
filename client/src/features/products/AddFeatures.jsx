import { useFieldArray } from "react-hook-form";
import Input from "../../ui/Input";
import { Trash } from "iconsax-reactjs";
import Button from "../../ui/Button";
function AddFeatures({ name, control, register }) {
  const { append, fields, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-4">

      {fields.map((field, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-5 lg:flex-row lg:items-center"
        >
          
          <Input
            placeholder="نام ویژگی"
            {...register(`features.${index}.key`)}
          />

          <Input
            placeholder="مقدار ویژگی"
            {...register(`features.${index}.value`)}
          />
          <button onClick={() => remove(index)}>
            <Trash size="28" className="text-red-500" />
          </button>
        </div>
      ))}

      <Button
        variation="secondary"
        size="large"
        onClick={() => append({ key: "", value: "" })}
      >
        اضافه کردن ویژگی جدید
      </Button>
    </div>
  );
}

export default AddFeatures;
