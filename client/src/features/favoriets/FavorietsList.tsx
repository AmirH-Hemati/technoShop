import DataStateHandler from "../../ui/DataStateHandler.js";
import Spinner from "../../ui/Spinner.js";
import FavorietItem from "./FavorietItem.js";
import { useMyFavoriets } from "./useMyFavoriets.js";

function FavorietsList() {
  const { favoriets, isLoading, error, refetch } = useMyFavoriets();

  return (
    <DataStateHandler
      isLoading={isLoading}
      data={favoriets}
      error={error}
      onRetry={refetch}
    >
      <ul className="grid max-h-[600px] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriets?.map((favoriet) => (
          <FavorietItem key={favoriet._id} favoriet={favoriet} />
        ))}
      </ul>
    </DataStateHandler>
  );
}

export default FavorietsList;
