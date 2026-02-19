import DataStateHandler from "../../ui/DataStateHandler.js";
import Address from "./Address.js";
import { useMyAddresses } from "./useMyAddresses.js";

type Props = { checkBox?: boolean };
function Addresses({ checkBox = false }: Props) {
  const { addresses, isLoading, error, refetch } = useMyAddresses();
  return (
    <DataStateHandler
      isLoading={isLoading}
      data={addresses}
      error={error}
      onRetry={refetch}
    >
      <ul className="w-full space-y-5">
        {addresses?.map((address) => (
          <Address key={address?._id} address={address} checkBox={checkBox} />
        ))}
      </ul>
    </DataStateHandler>
  );
}

export default Addresses;
