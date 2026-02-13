import { colors } from "../data/colors";
import SelectForm from "./Select";

function SelectColor({ control }) {
  return (
    <SelectForm
      name="colors"
      placeholder="انتخاب رنگ"
      rules={{ required: "این فیلد ضروری است" }}
      control={control}
      options={colors?.map((color) => ({
        label: (
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: color.hex }}
            ></span>
            <span> {color.label}</span>
          </div>
        ),
        value: color.value,
      }))}
      isMulti
    />
  );
}

export default SelectColor;
