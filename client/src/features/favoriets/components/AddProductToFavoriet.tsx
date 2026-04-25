import { Heart } from "iconsax-reactjs";
import { useCreateFavoriet } from "../hooks/useCreateFavoriet.js";
import { useMyFavoriets } from "../hooks/useMyFavoriets.js";
import type { FavorietType } from "../types/favoriet.js";

type Props = {
  productId: string;
  className?: string;
};

function AddProductToFavoriet({ productId, className }: Props) {
  const { createFavoriet, isCreateing } = useCreateFavoriet();
  const { favoriets } = useMyFavoriets();

  const isFav = favoriets.some(
    (favoriet: FavorietType) => favoriet.product._id === productId,
  );

  return (
    <Heart
      size={26}
      onClick={() => createFavoriet(productId)}
      variant={isFav ? "Bold" : "Linear"}
      className={`cursor-pointer transition-colors ${
        isFav ? "text-red-500" : "text-gray-400"
      } ${className}`}
    />
  );
}

export default AddProductToFavoriet;
