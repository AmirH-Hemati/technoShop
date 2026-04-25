import Categories from "@/features/categories/components/Categories.js";

import AmazingPriceProducts from "../../features/products/components/AmazingPriceProducts.js";
import BestSellerProducts from "../../features/products/components/BestSellerProducts.js";
import LatestProducts from "../../features/products/components/LatestProducts.js";
import Artboards from "../../ui/Artboards.jsx";
import Banner from "../../ui/Banner.jsx";
import FeatureSection from "../../ui/FeatureSection.js";
import ScrollToTopButton from "../../ui/ScrollToTopButton.js";
import WatchBanner from "../../ui/WatchBanner.js";

function Home() {
  return (
    <div className="mt-11 flex flex-col gap-14">
      <Artboards />
      <Categories />
      <AmazingPriceProducts />
      <LatestProducts />
      <Banner />
      <BestSellerProducts />
      <WatchBanner />

      <FeatureSection />
    </div>
  );
}

export default Home;
