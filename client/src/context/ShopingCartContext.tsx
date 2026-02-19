import { useLocalStorageState } from "@/hooks/useLocalStorageState.js";
import {
  createContext,
  useContext,
  type PropsWithChildren,
  type ReactElement,
} from "react";

type CartItem = {
  id: string;
  qty: number;
};

type ShoppingCartContextValue = {
  handleIncreaseProductQty: (id: string) => void;
  handleDecreaseProductQty: (id: string) => void;
  handleRemoveProduct: (id: string) => void;
  getProductQty: (id: string) => number;
  cartQty: () => number;
  cartItems: CartItem[] | [];
};

const ShopingCartContext = createContext<ShoppingCartContextValue | undefined>(
  undefined,
);

type Props = PropsWithChildren;
function ShopingCartProvider({ children }: Props): ReactElement {
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>(
    [],
    "shopingCart",
  );

  function handleIncreaseProductQty(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item?.id === id)) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
        return [...currentItems, { id, qty: 1 }];
      }
    });
  }

  function handleDecreaseProductQty(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        );
      }
    });
  }

  function getProductQty(id: string): number {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  }
  
  function handleRemoveProduct(id: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  function cartQty(): number {
    return cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  }
  return (
    <ShopingCartContext.Provider
      value={{
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        handleRemoveProduct,
        getProductQty,
        cartQty,
        cartItems,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
}

function useShopingCart() {
  const context = useContext(ShopingCartContext);

  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider",
    );
  }
  return context;
}
export { ShopingCartProvider, useShopingCart };
