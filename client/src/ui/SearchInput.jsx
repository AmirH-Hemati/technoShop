import { useRef, useState } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import Input from "./Input";
import SearchModal from "./SearchModal";
import { useSearchProducts } from "../features/products/useSearchProducts";
import ProductCard from "../features/products/ProductCard";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { products, isLoading } = useSearchProducts(query);
  const searchRef = useRef(null);
  function handelClose() {
    setOpen(false);
  }
  return (
    <div className="relative flex items-center w-full lg:w-lg border-2 py-2 px-4 border-[#929292] rounded-md focus-within:border-primary " ref={searchRef}>
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجو"
        className="focus:none border-none outline-none  flex-1 placeholder:text-300"
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
