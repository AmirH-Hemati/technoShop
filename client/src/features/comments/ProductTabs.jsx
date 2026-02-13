import { useState } from "react";
import ProductReviews from "../reviews/ProductReviews";
import ProductComments from "./ProductComments";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("comments");
  return (
    <div className="mt-10 w-full">
      <div className="flex items-center justify-between md:justify-start">
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-2 text-lg font-medium ${
            activeTab === "comments"
              ? "border-primary text-primary border-b-2"
              : "text-gray-500"
          }`}
        >
          کامنت کاربران
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 text-base font-medium md:text-lg ${
            activeTab === "reviews"
              ? "border-primary text-primary border-b-2"
              : "text-gray-500"
          }`}
        >
          نظرات خریداران
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "comments" && <ProductComments product={product} />}
        {activeTab === "reviews" && <ProductReviews product={product} />}
      </div>
    </div>
  );
}

export default ProductTabs;
