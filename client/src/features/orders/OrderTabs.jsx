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
    <div className="border-grey-300 bg-grey-0 shadow-2 flex h-[200px] w-full flex-col justify-between rounded-xl border p-1 px-4">
      <div className="flex items-center justify-between py-4">
        <h3 className="text-lg font-medium">تاریخچه سفارشات</h3>
      </div>
      <div className="flex cursor-pointer items-center gap-8">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 py-2 font-medium transition-all duration-300 select-none ${status === tab.value ? "border-b-4 border-red-500 text-red-500 rounded-sm" : "grayscale"}`}
            onClick={() => handelClick(tab.value)}
          >
            <span className="text-sm">{tab.label}</span>
            <span className="flex h-5 w-5 items-center justify-center bg-red-500 text-[12px] text-white">
              {tab.count}
            </span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTabs;
