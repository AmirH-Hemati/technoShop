import { Heart } from "iconsax-reactjs";

import type { Favoriet } from "./types/favoriet.js";
import { useCreateFavoriet } from "./useCreateFavoriet.js";
import { useMyFavoriets } from "./useMyFavoriets.js";

type Props = {
  productId: string;
  className?: string;
};

function AddProductToFavoriet({ productId, className }: Props) {
  const { createFavoriet, isCreateing } = useCreateFavoriet();
  const { favoriets } = useMyFavoriets();

  const isFav = favoriets.some(
    (favoriet: Favoriet) => favoriet.product._id === productId,
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
