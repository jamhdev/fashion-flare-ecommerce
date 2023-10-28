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
import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export default function Router() {
  const [shoppingCart, setShoppingCart] = useState([]);
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
        { path: "shop", element: <Shop /> },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return (
    <>
      <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
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
