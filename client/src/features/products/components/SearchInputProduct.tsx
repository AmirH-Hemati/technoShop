import { useCallback, useEffect, useRef, useState } from "react";

import { SearchNormal1 } from "iconsax-reactjs";

import SearchModal from "@/ui/SearchModal.js";
import Spinner from "@/ui/Spinner.js";

import { useSearchProducts } from "@/features/products/hooks/useSearchProducts.js";

import { useDebounce } from "@/utils/useDebounce.js";

import ProductCard from "./ProductCard.js";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { products, isLoading } = useSearchProducts(debouncedQuery);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setOpen(true);
    }
  }, [debouncedQuery]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return (
    <div className="relative w-full lg:w-lg">
      <div className="flex w-full items-center rounded-md border-2 border-[#929292] px-4 py-2 focus-within:border-primary">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در محصولات..."
          className="flex-1 border-none outline-none placeholder:text-300 focus:none"
          aria-label="جستجو"
        />
        <SearchNormal1 size="22" className="text-[#444444]" />
      </div>

      {open && (
        <SearchModal onClose={handleClose}>
          <div className="p-2">
            {debouncedQuery.length < 2 ? (
              <p className="text-center text-grey-400">
                حداقل ۲ کاراکتر وارد کنید
              </p>
            ) : isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : products?.length === 0 ? (
              <p className="text-center text-grey-400">
                هیچ محصولی برای "{debouncedQuery}" پیدا نشد
              </p>
            ) : (
              <ul className="space-y-2">
                {products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </ul>
            )}
          </div>
        </SearchModal>
      )}
    </div>
  );
}

export default SearchInput;
