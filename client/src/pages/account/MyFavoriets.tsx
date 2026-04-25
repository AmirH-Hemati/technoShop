import BackButton from "@/ui/BackButton.js";
import Heading from "@/ui/Heading.js";

import FavorietsList from "@/features/favoriets/components/FavorietsList.js";

function MyFavoriets() {
  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BackButton />
          <Heading type="h2">اطلاعات فردی</Heading>
        </div>
        <p className="text-300 text-grey-600">مواردی که لیست شده</p>
      </div>
      <FavorietsList />
    </>
  );
}

export default MyFavoriets;
