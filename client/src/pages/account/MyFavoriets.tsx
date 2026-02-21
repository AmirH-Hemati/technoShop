import Heading from "@/ui/Heading.js";
import FavorietsList from "../../features/favoriets/FavorietsList.js";
import { ArrowLeft, ArrowRight } from "iconsax-reactjs";

function MyFavoriets() {
  return (
    <>
      <div className="space-y-1">
        <Heading type="h2">اطلاعات فردی</Heading>
        <p className="text-300 text-grey-600">مواردی که لیست شده</p>
      </div>
      <FavorietsList />
    </>
  );
}

export default MyFavoriets;
