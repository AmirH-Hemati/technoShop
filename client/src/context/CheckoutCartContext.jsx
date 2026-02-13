import { createContext, useContext, useEffect, useState } from "react";
import { useProductsByIds } from "../features/products/useProductsByIds";
import { useShopingCart } from "./ShopingCartContext";

const CheckoutContext = createContext();
function CheckoutProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState({});
  const { fetchProducts, isPending, products } = useProductsByIds();
  const { cartItems } = useShopingCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      const ids = cartItems.map((item) => item.id);
      fetchProducts(ids);
    }
  }, [cartItems, fetchProducts]);

  function handelNextStep() {
    setCurrentStep((currentStep) => currentStep + 1);
  }

  function handelSetStep(id) {
    setCurrentStep(id);
  }

  function handelSelectAddress(selectedAddress) {
    setSelectedAddress(selectedAddress);
  }

  return (
    <CheckoutContext.Provider
      value={{
        isPending,
        products,
        currentStep,
        selectedAddress,
        onNext: handelNextStep,
        onSelectAddress: handelSelectAddress,
        onSetStep: handelSetStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

function useCheckout() {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    return new Error(
      "شما زا کانتکس چک اوت بیرون از پروایدر ان استفاده کرده اید",
    );
  }
  return context;
}
export { CheckoutProvider, useCheckout };
