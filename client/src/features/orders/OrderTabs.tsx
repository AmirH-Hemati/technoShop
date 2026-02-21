import { useSearchParams } from "react-router-dom";

const tabs = [
  { label: "جاری", count: 2, value: "processing" },
  { label: "تحویل شده ", count: 5, value: "delivered" },
  { label: "ارسال شده", count: 8, value: "shipped" },
];

function OrderTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "processing";
  function handelClick(value) {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex w-full flex-col justify-between border-b p-1 md:px-4 md:py-3">
      <div className="flex cursor-pointer items-center md:gap-8">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`text-100 flex items-center gap-1 px-3 py-1 font-medium transition-all duration-300 select-none ${status === tab.value ? "rounded-sm bg-blue-100 text-blue-900" : "grayscale"}`}
            onClick={() => handelClick(tab.value)}
          >
            <span>{tab.label}</span>
            <span>{tab.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTabs;
