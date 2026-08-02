import { Suspense, lazy, useEffect } from "react";

import { ToastContainer } from "react-toastify";

import { NuqsAdapter } from "nuqs/adapters/react";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Spinner } from "./components/ui/spinner.js";
import { ShopingCartProvider } from "./context/ShopingCartContext.js";
import AccountLayout from "./pages/account/AccountLayout.js";
import NotFoundPage from "./pages/home/NotFoundPage.js";
import Test from "./pages/test.js";
import MainLayout from "./ui/MainLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.js";
import { setNavigate } from "./utils/navigate.js";

const Home = lazy(() => import("./pages/home/Home.js"));
const AddressesPage = lazy(() => import("./pages/account/AddressesPage.js"));
const MyFavoriets = lazy(() => import("./pages/account/MyFavoriets.js"));
const Orders = lazy(() => import("./pages/account/Orders.jsx"));
const PersonalInfo = lazy(() => import("./pages/account/PersonalInfo.js"));
const Profile = lazy(() => import("./pages/account/Profile.js"));
const AboutUs = lazy(() => import("./pages/home/AboutUs.js"));
const Cart = lazy(() => import("./pages/home/Cart.js"));
const ContactUs = lazy(() => import("./pages/home/ContactUs.js"));
const Product = lazy(() => import("./pages/home/Product.js"));
const Products = lazy(() => import("./pages/home/Products.js"));
const Verify = lazy(() => import("./pages/home/Verify.js"));

function App() {
  return (
    <ShopingCartProvider>
      <NuqsAdapter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<Product />} />
              <Route path="verify" element={<Verify />} />
              <Route
                path="cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="contactUs" element={<ContactUs />} />
              <Route path="aboutUs" element={<AboutUs />} />
            </Route>
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={`profile`} />} />
              <Route path="profile" element={<Profile />} />
              <Route path="personalInfo" element={<PersonalInfo />} />
              <Route path="orders" element={<Orders />} />
              <Route path="myFavoriets" element={<MyFavoriets />} />
              <Route path="addresses" element={<AddressesPage />} />
            </Route>
            <Route path="/test" element={<div>this is sample page</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </NuqsAdapter>
    </ShopingCartProvider>
  );
}

export default App;
