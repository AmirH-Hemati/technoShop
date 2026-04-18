import DataStateHandler from "@/ui/DataStateHandler.js";
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
      emptyMessage="محصول مورد علاقه ای برای نمایش وجود ندارد ، لطفا ابتدا یک محصول اضافه کنید"
    >
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriets?.map((favoriet) => (
          <FavorietItem key={favoriet._id} favoriet={favoriet} />
        ))}
      </ul>
    </DataStateHandler>
  );
}

export default FavorietsList;
