import Heading from "../../ui/Heading";

function Features({ features }) {
  return (
    <div className="space-y-3">
      <Heading type="h3">مشخصات</Heading>

      {features.map((feature) => (
        <div className="bg-grey-100 flex items-center justify-between p-4 text-base leading-normal font-semibold">
          <span> {feature.key} : </span>
          <span> {feature.value} </span>
        </div>
      ))}
    </div>
  );
}

export default Features;
