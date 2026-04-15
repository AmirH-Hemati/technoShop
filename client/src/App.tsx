import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ShopingCartProvider } from "./context/ShopingCartContext.js";
import AccountLayout from "./pages/account/AccountLayout.js";
import AddressesPage from "./pages/account/AddressesPage.js";
import MyFavoriets from "./pages/account/MyFavoriets.js";
import Orders from "./pages/account/Orders.jsx";
import PersonalInfo from "./pages/account/PersonalInfo.js";
import Profile from "./pages/account/Profile.jsx";
import AboutUs from "./pages/home/AboutUs.jsx";
import Cart from "./pages/home/Cart.js";
import ContactUs from "./pages/home/ContactUs.js";
import Home from "./pages/home/Home.jsx";
import Product from "./pages/home/Product.jsx";
import Products from "./pages/home/Products.js";
import Verify from "./pages/home/Verify.jsx";
import MainLayout from "./ui/MainLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

import { NuqsAdapter } from "nuqs/adapters/react";

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
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="verify" element={<Verify />} />
                <Route path="products/:slug" element={<Product />} />
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
