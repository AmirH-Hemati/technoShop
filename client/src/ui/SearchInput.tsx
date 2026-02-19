import { useRef, useState } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import Input from "./Input.js";
import SearchModal from "./SearchModal.js";
import { useSearchProducts } from "../features/products/useSearchProducts.js";
import ProductCard from "../features/products/ProductCard.js";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { products, isLoading } = useSearchProducts(query);
  const searchRef = useRef(null);
  function handelClose() {
    setOpen(false);
  }
  return (
    <div
      className="focus-within:border-primary relative flex w-full items-center rounded-md border-2 border-[#929292] px-4 py-2 lg:w-lg"
      ref={searchRef}
    >
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجو"
        className="focus:none placeholder:text-300 flex-1 border-none outline-none"
      />

      <span className="">
        <SearchNormal1 size="22" className="text-[#444444]" />
      </span>

      <SearchModal open={open} onClose={handelClose} extraRef={searchRef}>
        {query.length >= 2 && products?.length > 0 ? (
          <ul>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isLoading={isLoading}
                onClose={handelClose}
                setQuery={setQuery}
              />
            ))}
          </ul>
        ) : query.length >= 2 ? (
          <p className="text-grey-400 text-center">هیچ محصولی پیدا نشد</p>
        ) : (
          <p className="text-grey-400 text-center">
            از بین محصولات شگفت انگیز ما جستجو کنید ...
          </p>
        )}
      </SearchModal>
    </div>
  );
}

export default SearchInput;
