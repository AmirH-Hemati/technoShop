import SelectForm from "./Select";

function SelectCategory({ control, categories }) {
  return (
    <SelectForm
      name="category"
      rules={{ required: "این فیلد ضروری است" }}
      placeholder="انتخاب دسته بندی"
      control={control}
      options={categories.map((category) => ({
        label: category.label,
        value: category._id,
      }))}
    />
  );
}

export default SelectCategory;
