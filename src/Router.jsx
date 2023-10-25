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
        { path: "shop", element: <Shop /> },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
