import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ShopingCartContext = createContext();
function ShopingProviderProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorageState([], "shopingCart");
  function handelIncreaseProductQty(id) {
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
  function handelDecreaseProductQty(id) {
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

  function getProductQty(id) {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  }
  function handelRemoveProduct(id) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  function cartQty() {
    return cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  }
  return (
    <ShopingCartContext.Provider
      value={{
        handelIncreaseProductQty,
        handelDecreaseProductQty,
        handelRemoveProduct,
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
    return new Error("شما زا کانتکس شاپ بیرون از پروایدر ان استفاده کرده اید");
  }
  return context;
}
export { ShopingProviderProvider, useShopingCart };
