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
import { useEffect, useState } from "react";
import ItemPage from "./pages/ItemPage";
import { ShoppingCartContext } from "./ShoppingCart/context";
import {
  addShoppingCartItem,
  removeShoppingCartItem,
  deleteAllOfSpecificItem,
  calculateSubTotal,
} from "./ShoppingCart/actions";
import useLocalStorage from "./hooks/useLocalStorage";

export default function Router() {
  const [subTotal, setSubTotal] = useState(0);
  const [shoppingCart, setShoppingCart] = useLocalStorage("shoppingCart");

  useEffect(() => {
    setSubTotal(calculateSubTotal(shoppingCart));
  }, [shoppingCart]);

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
