import { Heart } from "iconsax-reactjs";
import { useCreateFavoriet } from "./useCreateFavoriet";
import { useMyFavoriets } from "./useMyFavoriets";

function AddProductToFavoriet({ productId, className }) {
  const { createFavoriet, isCreateing } = useCreateFavoriet();
  const { favoriets } = useMyFavoriets();

  const isFav = favoriets.some(
    (favoriet) => favoriet.product._id === productId,
  );

  return (
    <Heart
      size={26}
      disabled={isCreateing}
      onClick={() => createFavoriet(productId)}
      variant={isFav ? "Bold" : "Linear"}
      className={`transition-colors cursor-pointer ${
        isFav ? "text-red-500" : "text-gray-400"
      } ${className}`}
    />
  );
}

export default AddProductToFavoriet;
