import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContextProvider";
import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const [amountOfCartItems, setAmountOfCartItems] = useState(0);
  const [animationKey, setAnimationKey] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 640px)" });

  useEffect(() => {
    if (isLargeScreen) {
      setIsMobileActive(false);
    }
  }, [isLargeScreen]);

  const { shoppingCart, handleNavTabChange, selectedNavTab, setShopFilter } =
    useContext(AppContext);

  useEffect(() => {
    let totalItems = 0;
    shoppingCart.forEach((value) => {
      totalItems += value.quantity;
    });
    setAmountOfCartItems(totalItems);
    setAnimationKey((prevKey) => !prevKey);
  }, [shoppingCart]);

  return (
    <div className="bg-primaryBackground flex w-full items-center justify-between p-2 font-poppins">
      <Link to={"/"} className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="60"
          height="60"
          viewBox="0 0 48 48"
          onClick={() => {
            handleNavTabChange("home");
          }}
        >
          <path
            fill="#64b5f6"
            d="M37,36H17c-2.761,0-5-2.239-5-5V11c0-2.761,2.239-5,5-5h20c2.761,0,5,2.239,5,5v20 C42,33.761,39.761,36,37,36z M21,30h14V18.5c0-3.038-2.462-5.5-5.5-5.5H18v14C18,28.657,19.343,30,21,30z"
          ></path>
          <path
            fill="#4338ca"
            d="M31,42H11c-2.761,0-5-2.239-5-5V17c0-2.761,2.239-5,5-5h20c2.761,0,5,2.239,5,5v20 C36,39.761,33.761,42,31,42z M17.5,36H30V21c0-1.657-1.343-3-3-3H15c-1.657,0-3,1.343-3,3v9.5C12,33.538,14.462,36,17.5,36z"
          ></path>
          <path
            fill="#64b5f6"
            d="M36,26v1c0,1.657-1.343,3-3,3H23v6h14c2.75,0,5-2.25,5-5v-5H36z"
          ></path>
        </svg>

        <h1 className="hidden text-2xl font-extrabold md:block">
          <strong className="w-44 font-extrabold text-indigo-700 md:block">
            Fashion Flare
          </strong>
        </h1>
      </Link>

      <div className="flex w-full items-center justify-start md:hidden ">
        {!isMobileActive ? (
          <button
            className="pl-8"
            onClick={() => {
              setIsMobileActive(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        ) : (
          <ul className="fixed inset-0 z-50 w-full bg-white">
            <li>
              <Link
                to={"/home"}
                onClick={() => {
                  handleNavTabChange("home");
                  setIsMobileActive(false);
                }}
                id="home"
                className="flex cursor-pointer items-center gap-2 border-s-[3px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-700"
              >
                <span className="text-sm font-medium"> Home </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/shop"}
                onClick={() => {
                  setShopFilter({ mens: false, womens: false, jewelry: false });
                  handleNavTabChange("shop");
                  setIsMobileActive(false);
                }}
                id="shop"
                className="flex cursor-pointer items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Shop all </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/shop"}
                onClick={() => {
                  setShopFilter({ mens: true, womens: false, jewelry: false });
                  handleNavTabChange("shop");
                  setIsMobileActive(false);
                }}
                id="mens"
                className="flex cursor-pointer items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Mens </span>
              </Link>
            </li>{" "}
            <li>
              <Link
                to={"/shop"}
                onClick={() => {
                  setShopFilter({ mens: false, womens: true, jewelry: false });
                  handleNavTabChange("shop");
                  setIsMobileActive(false);
                }}
                id="womens"
                className="flex cursor-pointer items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Womens </span>
              </Link>
            </li>{" "}
            <li>
              <Link
                to={"/shop"}
                onClick={() => {
                  setShopFilter({ mens: false, womens: false, jewelry: true });
                  handleNavTabChange("shop");
                  setIsMobileActive(false);
                }}
                id="jewelry"
                className="flex cursor-pointer items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Jewelry </span>
              </Link>
            </li>
            <li
              onClick={() => {
                setIsMobileActive(false);
              }}
            >
              <a
                href="#"
                className="flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Close </span>
              </a>
            </li>
          </ul>
        )}
      </div>
      <div className="hidden md:block">
        <nav className="flex gap-6" aria-label="Tabs">
          <Link
            to={"/"}
            className={
              selectedNavTab === "home"
                ? "shrink-0 rounded-lg bg-indigo-100 p-2 text-sm font-medium text-indigo-600 transition-all"
                : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
            }
            onClick={() => {
              handleNavTabChange("home");
            }}
          >
            Home
          </Link>
          <Link
            to={"/shop"}
            className={
              selectedNavTab === "shop"
                ? "shrink-0 rounded-lg bg-indigo-100 p-2 text-sm font-medium text-indigo-600 transition-all"
                : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
            }
            onClick={() => {
              setShopFilter({ mens: false, womens: false, jewelry: false });
              handleNavTabChange("shop");
            }}
          >
            Shop all
          </Link>
          <Link
            to={"/shop"}
            className={
              selectedNavTab === "womens"
                ? "shrink-0 rounded-lg bg-indigo-100 p-2 text-sm font-medium text-indigo-600 transition-all"
                : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
            }
            onClick={() => {
              setShopFilter({ mens: false, womens: true, jewelry: false });
              handleNavTabChange("womens");
            }}
          >
            Womens
          </Link>

          <Link
            to={"/shop"}
            className={
              selectedNavTab === "mens"
                ? "shrink-0 rounded-lg bg-indigo-100 p-2 text-sm font-medium text-indigo-600 transition-all"
                : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
            }
            onClick={() => {
              setShopFilter({ mens: true, womens: false, jewelry: false });
              handleNavTabChange("mens");
            }}
          >
            Mens
          </Link>

          <Link
            to={"/shop"}
            className={
              selectedNavTab === "jewelry"
                ? "shrink-0 rounded-lg bg-indigo-100 p-2 text-sm font-medium text-indigo-600 transition-all"
                : "shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
            }
            aria-current="page"
            onClick={() => {
              setShopFilter({ mens: false, womens: false, jewelry: true });
              handleNavTabChange("jewelry");
            }}
          >
            Jewelry
          </Link>
        </nav>
      </div>
      <Link to={"/cart"} className="relative transition-all md:hover:scale-110">
        <div className="h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        {amountOfCartItems && amountOfCartItems > 0 ? (
          <div className="absolute right-0 top-0 h-7 w-7 -translate-y-3 translate-x-3 rounded-full bg-white">
            <div
              key={animationKey}
              className="flex animate-bounceOnce items-center justify-center font-poppins text-lg text-green-500"
            >
              {amountOfCartItems}
            </div>
          </div>
        ) : null}
      </Link>
    </div>
  );
}
