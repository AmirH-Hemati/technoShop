import { CloseSquare } from "iconsax-reactjs";

import { useSearchParams } from "react-router-dom";

function ActiveFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = [...searchParams];
  function handelRemoveSearch(search) {
    searchParams.delete(search);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex max-w-full items-center justify-center gap-4 overflow-x-auto">
      {activeFilter.map(([key, value]) => (
        <div
          key={value}
          onClick={() => handelRemoveSearch(key)}
          className="flex w-fit cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-500 p-1 text-gray-700"
        >
          <span>{value}</span>
          <CloseSquare />
        </div>
      ))}
    </div>
  );
}

export default ActiveFilter;
