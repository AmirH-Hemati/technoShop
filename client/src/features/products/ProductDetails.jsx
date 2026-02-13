import Heading from "../../ui/Heading";
import ImageSlider from "../../ui/ImageSlider";
import { useProduct } from "./useProduct";
import RelatedProducts from "./RelatedProducts";
import Features from "./Features";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import ProductInfo from "./ProductInfo";
import Spinner from "../../ui/Spinner";
import ProductTabs from "../comments/ProductTabs";

function ProductDetails() {
  const { product, isLoading } = useProduct();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-8 py-4 lg:px-6">
      <div className="grid grid-cols-1 items-center md:grid-cols-2 ">
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
