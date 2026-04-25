import { useSearchParams } from "react-router-dom";

import Select from "./Select";

function SortBy({ options, disabledLabel }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handelChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      fit
      options={options}
      control={control}
      onChange={handelChange}
      value={sortBy}
      disabledLabel={disabledLabel}
    />
  );
}

export default SortBy;
