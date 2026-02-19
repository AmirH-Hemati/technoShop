import RelatedProducts from "./RelatedProducts.js";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import ProductTabs from "../comments/ProductTabs.js";

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
        <TabsList className="mb-6 rounded-none flex !h-14 w-full items-center justify-start gap-6">
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-b-primary flex-0 rounded-none border-b-4 border-transparent data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-grey-800"
            value="specs"
          >
            مشخصات فنی
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-b-primary flex-0 rounded-none border-b-4 border-transparent data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-grey-800"
            value="review"
          >
            نقد و بررسی
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-b-primary flex-0 rounded-none border-b-4 border-transparent data-[state=active]:border-b-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-grey-800"
            value="comments"
          >
            نظرات کاربران
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="space-y-6">
          <Features features={product?.features} />
        </TabsContent>

        <TabsContent value="review">
          <Heading type="h3">نقد و بررسی</Heading>

          <FroalaEditorView model={product?.description} />
        </TabsContent>

        <TabsContent value="comments">
          <div className="bg-card min-h-[400px] rounded-lg border p-6">
            <Heading type="h3">نظرات کاربران</Heading>
            <ProductTabs product={product} />
          </div>
        </TabsContent>
      </Tabs>

      <RelatedProducts product={product} />
    </div>
  );
}
export default ProductDetails;
