import Categories from "../../features/categories/Categories";
import AmazingPriceProducts from "../../features/products/AmazingPriceProducts";
import BestSellerProducts from "../../features/products/BestSellerProducts";
import LatestProducts from "../../features/products/LatestProducts";
import Artboards from "../../ui/Artboards";
import Banner from "../../ui/Banner";
import FeatureSection from "../../ui/FeatureSection";
import ScrollToTopButton from "../../ui/ScrollToTopButton";
import WatchBanner from "../../ui/WatchBanner";

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
