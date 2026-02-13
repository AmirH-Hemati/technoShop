import DataStateHandler from "../../ui/DataStateHandler";
import Address from "./Address";
import { useMyAddresses } from "./useMyAddresses";

function Addresses({ checkBox }) {
  const { addresses, isLoading, error, refetch } = useMyAddresses();
  console.log(addresses);
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
