import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ShopingCartProvider } from "./context/ShopingCartContext.js";
import ProtectedRoute from "./ui/ProtectedRoute.js";
import MainLayout from "./ui/MainLayout.jsx";
import AccountLayout from "./pages/account/AccountLayout.js";

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

import { NuqsAdapter } from "nuqs/adapters/react";
import { Spinner } from "./components/ui/spinner.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <ShopingCartProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Routes>
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
              </Routes>
            </Suspense>
          </BrowserRouter>
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
      </QueryClientProvider>
    </ShopingCartProvider>
  );
}

export default App;
