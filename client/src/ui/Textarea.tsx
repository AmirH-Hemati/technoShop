import type { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"textarea">;
function Textarea(props: Props) {
  return (
    <textarea
      {...props}
      className="bg-grey-0 border-grey-300 text-grey-800 w-full rounded-t-md border p-3"
    ></textarea>
  );
}

export default Textarea;
