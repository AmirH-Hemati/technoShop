import type { SelectOptionType } from "@/types/select-option-types.js";
import Heading from "@/ui/Heading.js";

function Features({ features }: { features: SelectOptionType[] }) {
  return (
    <div className="space-y-3">
      <Heading type="h3">مشخصات</Heading>

      {features.map((feature) => (
        <div className="bg-grey-100 flex items-center justify-between p-4 text-base leading-normal font-semibold">
          <span> {feature.label} : </span>
          <span> {feature.value} </span>
        </div>
      ))}
    </div>
  );
}

export default Features;
