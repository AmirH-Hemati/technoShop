import { Controller } from "react-hook-form";
import Select from "react-select";
function SelectForm({
  isMulti = false,
  options,
  control,
  name,
  rules,
  placeholder,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Select
          placeholder={placeholder}
          onChange={(selected) => {
            isMulti
              ? field.onChange(selected.map((option) => option.value) || [])
              : field.onChange(selected.value || "");
          }}
          value={
            isMulti
              ? options.filter((option) =>
                  field.value?.includes(option.value),
                ) || []
              : options?.find((option) => option.value === field.value) || ""
          }
          isMulti={isMulti}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          options={options}
          className="z-50 text-sm"
        />
      )}
    />
  );
}

export default SelectForm;
