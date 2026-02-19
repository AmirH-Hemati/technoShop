import RelatedProducts from "./RelatedProducts.js";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import ProductTabs from "../comments/ProductTabs.js";

import { useProduct } from "./useProduct.js";
import ImageSlider from "@/ui/ImageSlider.js";
import Features from "./Features.js";
import ProductInfo from "./ProductInfo.js";
import Heading from "@/ui/Heading.js";
import Spinner from "@/ui/Spinner.js";
import BreadcrumbNav from "@/ui/BreadcrumbNav.js";

function ProductDetails() {
  const { product, isLoading } = useProduct();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        <ImageSlider
          images={[
            product.imageCover,
            "/download1.png",
            "/download2.png",
            "/download2.png",
          ]}
        />
        <ProductInfo product={product} />
      </div>

      <Features features={product?.features} />

      <div className="border-primary border-t py-5">
        <Heading type="h3">مشخصات و بررسی</Heading>
        <FroalaEditorView model={product?.description} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts product={product} />
    </div>
  );
}

export default ProductDetails;
