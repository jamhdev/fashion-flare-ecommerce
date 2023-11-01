import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import { createContext, useEffect, useState } from "react";
import AddedToCartNotificationModal from "./components/PurchaseNotificationModal";
import ItemPage from "./pages/ItemPage";
import currency from "currency.js";

export const ShoppingCartContext = createContext();

export default function Router() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = currency(0);
    shoppingCart.forEach((value) => {
      total = total.add(value.price * value.quantity);
    });
    setSubTotal(total.value);
  }, [shoppingCart]);

  const addShoppingCartItem = (id, title, price, image) => {
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

  const removeShoppingCartItem = (id, title, price, image) => {
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

  const deleteAllOfSpecificItem = (id) => {
    setShoppingCart((prev) => prev.filter((item) => item.id !== id));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={"home"} />,
        },
        { path: "home", element: <Home /> },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        { path: "shop/:itemId", element: <ItemPage /> },
        { path: "*", element: <Navigate to={"/"} /> },
      ],
    },
  ]);

  return (
    <>
      <ShoppingCartContext.Provider
        value={{
          shoppingCart,
          setShoppingCart,
          addShoppingCartItem,
          removeShoppingCartItem,
          deleteAllOfSpecificItem,
          subTotal,
        }}
      >
        <RouterProvider router={router} />
      </ShoppingCartContext.Provider>
    </>
  );
}

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
