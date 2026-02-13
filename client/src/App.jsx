import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainLayout from "./ui/MainLayout";
import AdminLayout from "./ui/AdminLayout";
import Products from "./pages/home/Products";
import Home from "./pages/home/Home";
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import Categories from "./pages/admin/Categories";
import { ToastContainer } from "react-toastify";
import Product from "./pages/home/Product";
import AccountLayout from "./pages/account/AccountLayout";
import Profile from "./pages/account/Profile";
import MyFavoriets from "./pages/account/MyFavoriets";
import Users from "./pages/admin/Users";
import { ShopingProviderProvider } from "./context/ShopingCartContext";
import Cart from "./pages/home/Cart";
import Orders from "./pages/account/Orders";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import Verify from "./pages/home/Verify";
import PersonalInfo from "./pages/account/PersonalInfo";
import AddressesPage from "./pages/account/AddressesPage";
import ContactUs from "./pages/home/ContactUs";
import AboutUs from "./pages/home/AboutUs";
import ProtectedRoute from "./ui/ProtectedRoute";

import { NuqsAdapter } from "nuqs/adapters/react";

const queryClient = new QueryClient({
  defaultOption: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <ShopingProviderProvider>
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
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate replace to={`dashboard`} />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="categories" element={<Categories />} />
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="users" element={<Users />} />
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
    </ShopingProviderProvider>
  );
}

export default App;
