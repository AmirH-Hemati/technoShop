import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useShopingCart } from "./ShopingCartContext.js";
import { useProductsByIds } from "@/features/products/useProductsByIds.js";
import type { Address } from "@/features/addresses/types/address.js";
import type { Product } from "@/features/products/types/product.js";

type CheckoutContextValue = {
  isPending: boolean;
  products: Product[];
  currentStep: number;
  selectedAddress: Address | null;
  onNext: () => void;
  onSelectAddress: (selectedAddress: Address) => void;
  onSetStep: (id: number) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined,
);

function CheckoutProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
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

  function handelSetStep(id: number) {
    setCurrentStep(id);
  }

  function handelSelectAddress(selectedAddress: Address) {
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
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
export { CheckoutProvider, useCheckout };
