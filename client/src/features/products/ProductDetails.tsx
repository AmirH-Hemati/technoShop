import RelatedProducts from "./RelatedProducts.js";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import { useProduct } from "./useProduct.js";
import ImageSlider from "@/ui/ImageSlider.js";
import Features from "./Features.js";
import ProductInfo from "./ProductInfo.js";
import Heading from "@/ui/Heading.js";
import Spinner from "@/ui/Spinner.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.js";
import Comments from "../comments/Comments.js";

function ProductDetails() {
  const { product, isLoading } = useProduct();

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-6 space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="mb-6 flex !h-14 w-full items-center justify-start gap-6 overflow-x-auto rounded-none">
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-b-primary text-grey-800 text-200 flex-0 rounded-none border-b-4 border-transparent data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="specs"
          >
            مشخصات فنی
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-b-primary text-grey-800 text-200 flex-0 rounded-none border-b-4 border-transparent data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="review"
          >
            نقد و بررسی
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-b-primary text-grey-800 text-200 flex-0 rounded-none border-b-4 border-transparent data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="comments"
          >
            نظرات کاربران
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="space-y-6">
          <div className="md:px-6">
            <Features features={product?.features} />
          </div>
        </TabsContent>

        <TabsContent value="review">
          <div className="md:px-6">
            <Heading type="h3">نقد و بررسی</Heading>

            <FroalaEditorView model={product?.description} />
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="md:px-6">
            <Heading type="h3">نظرات کاربران</Heading>
            <Comments product={product} />
          </div>
        </TabsContent>
      </Tabs>

      <RelatedProducts product={product} />
    </div>
  );
}
export default ProductDetails;
