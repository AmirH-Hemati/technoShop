import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { useProductsByIds } from "@/features/products/useProductsByIds.js";
import type { AddressType } from "@/features/addresses/types/address.js";
import type { ProductType } from "@/features/products/types/product.js";

import { useShopingCart } from "./ShopingCartContext.js";

type CheckoutContextValue = {
  isPending: boolean;
  products: ProductType[];
  currentStep: number;
  selectedAddress: AddressType | null;
  onNext: () => void;
  onSelectAddress: (selectedAddress: AddressType) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined,
);

function CheckoutProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null,
  );
  const { fetchProducts, isPending, products } = useProductsByIds();
  const { cartItems } = useShopingCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      const ids: string[] = cartItems.map((item) => item.id);
      fetchProducts(ids);
    }
  }, [cartItems, fetchProducts]);

  function handelNextStep() {
    setCurrentStep((currentStep) => currentStep + 1);
  }

  function handelSelectAddress(selectedAddress: AddressType) {
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
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

function 

useCheckout() {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
export { CheckoutProvider, useCheckout };
