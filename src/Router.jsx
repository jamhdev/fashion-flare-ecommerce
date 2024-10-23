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
import ItemPage from "./pages/ItemPage";
import { useContext, useEffect } from "react";
import AppContextProvider, { AppContext } from "./contexts/AppContextProvider";
import Footer from "./components/Footer";

export default function Router() {
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
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  );
}

const MainLayout = () => {
  const { calculateSubTotal, shoppingCart, setSubTotal } =
    useContext(AppContext);

  useEffect(() => {
    setSubTotal(calculateSubTotal(shoppingCart));
  }, [shoppingCart]);

  return (
    <div className="bg-primaryBackground m-auto max-w-7xl">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
