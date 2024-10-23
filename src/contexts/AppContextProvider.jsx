import { createContext, useState } from "react";
import currency from "currency.js";
import useLocalStorage from "../hooks/useLocalStorage";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [subTotal, setSubTotal] = useState(0);
  const [shoppingCart, setShoppingCart] = useLocalStorage("shoppingCart");
  const [selectedNavTab, setSelectedNavTab] = useState("home");
  const [shopFilter, setShopFilter] = useLocalStorage({
    mens: false,
    womens: false,
    jewelry: false,
  });

  const addShoppingCartItem = (
    id,
    title,
    price,
    image,
    shoppingCart,
    setShoppingCart
  ) => {
    const isItemExists = shoppingCart.some((item) => item.id === id);
    if (isItemExists) {
      setShoppingCart((prev) => {
        return prev.map((cartItem) => {
          if (cartItem.id === id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      });
    } else {
      setShoppingCart((prev) => {
        const newState = [
          ...prev,
          { id: id, title: title, price: price, image: image, quantity: 1 },
        ];
        return newState;
      });
    }
  };

  const removeShoppingCartItem = (
    id,
    title,
    price,
    image,
    shoppingCart,
    setShoppingCart
  ) => {
    const isItemExists = shoppingCart.some((item) => item.id === id);
    if (isItemExists) {
      setShoppingCart((prev) => {
        return prev
          .map((cartItem) => {
            if (cartItem.id === id) {
              if (cartItem.quantity === 1) {
                return null; // Return null to filter out later
              }
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          })
          .filter(Boolean); // Filter out null values
      });
    }
  };

  const deleteAllOfSpecificItem = (id, shoppingCart, setShoppingCart) => {
    setShoppingCart((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateSubTotal = (shoppingCart) => {
    let total = currency(0);
    shoppingCart.forEach((value) => {
      total = total.add(value.price * value.quantity);
    });
    return total.value;
  };

  const handleNavTabChange = (tab) => {
    setSelectedNavTab(tab);
    if (tab === "womens" || tab === "mens" || tab === "jewelry") {
      console.log("hi");
    }
  };

  return (
    <AppContext.Provider
      value={{
        addShoppingCartItem,
        removeShoppingCartItem,
        deleteAllOfSpecificItem,
        calculateSubTotal,
        setShoppingCart,
        shoppingCart,
        subTotal,
        setSubTotal,
        handleNavTabChange,
        selectedNavTab,
        shopFilter,
        setShopFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
