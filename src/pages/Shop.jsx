import { useContext, useEffect, useState } from "react";
import ShopItem from "../components/ShopItem";
import { AppContext } from "../contexts/AppContextProvider";

export default function Shop() {
  const [shopItems, setShopItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const { shopFilter, setShopFilter } = useContext(AppContext);
  const { mens: mens, womens: womens, jewelry: jewelry } = shopFilter;

  const handleFilterUpdate = (e) => {
    if (e.target.id === "reset") {
      setShopFilter(() => {
        return { mens: false, womens: false, jewelry: false };
      });
    } else {
      setShopFilter((prev) => {
        return { ...prev, [e.target.id]: !prev[e.target.id] };
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://fakestoreapi.com/products", { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        let defaultState = json.filter((item) => {
          if (item.category === "men's clothing") return true;
          if (item.category === "women's clothing") return true;
          if (item.category === "jewelery") return true;
          return false;
        });
        setShopItems(defaultState);
      })
      .catch((error) => {
        console.log(error);
        setErrorState(error);
      })
      .finally(() => {
        setLoadingState(false);
      });

    return () => controller.abort();
  }, []);

  const filteredItems = shopItems.filter((item) => {
    if (!mens && !womens && !jewelry) return true;
    if (mens && item.category === "men's clothing") return true;
    if (womens && item.category === "women's clothing") return true;
    if (jewelry && item.category === "jewelery") return true;
    return false;
  });

  const filteredShopItems =
    filteredItems.length < 1 ? (
      <h1>loading...</h1>
    ) : (
      filteredItems.map((item, index) => <ShopItem key={index} {...item} />)
    );

  if (loadingState) {
    return (
      <>
        <div className="bg-primaryBackground flex h-screen w-full items-center justify-center">
          <img
            src="/images/icons/loading-icon.png"
            alt="loading-icon"
            className="w-20 max-w-full animate-spin"
          />
        </div>
      </>
    );
  }
  if (errorState) {
    return (
      <>
        <div className="bg-primaryBackground flex h-screen w-full items-center justify-center">
          <img
            src="/images/icons/error404-icon.png"
            alt="error icon"
            className="w-72 max-w-full"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-primaryBackground flex w-full flex-col">
        <div className="flex items-center justify-start gap-2 font-poppins">
          <div className="z-40 my-2 ml-4 h-20 w-60 space-y-2">
            <details className="group overflow-hidden rounded border border-gray-300">
              <summary className="flex h-10 cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> Filters </span>

                <span className="transition-transform duration-300 group-open:rotate-180">
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
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-center">
                  <button
                    id="reset"
                    type="button"
                    className="flex h-10 w-full items-center justify-start pl-4 text-sm text-gray-900 underline underline-offset-4"
                    onClick={handleFilterUpdate}
                  >
                    Reset
                  </button>
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    <label
                      htmlFor="mens"
                      className="inline-flex w-full cursor-pointer items-center gap-2 py-2"
                    >
                      <input
                        type="checkbox"
                        id="mens"
                        className="size-5 rounded border-gray-300"
                        onChange={handleFilterUpdate}
                        checked={mens}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Men's
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="womens"
                      className="inline-flex w-full cursor-pointer items-center gap-2 py-2"
                    >
                      <input
                        type="checkbox"
                        id="womens"
                        className="size-5 rounded border-gray-300"
                        onChange={handleFilterUpdate}
                        checked={womens}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Women's
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="jewelry"
                      className="inline-flex w-full cursor-pointer items-center gap-2 py-2"
                    >
                      <input
                        type="checkbox"
                        id="jewelry"
                        className="size-5 rounded border-gray-300"
                        onChange={handleFilterUpdate}
                        checked={jewelry}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Jewelry
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        <div className="grid min-h-screen w-full grid-cols-1 items-center justify-items-center gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredShopItems}
        </div>
      </div>
    </>
  );
}
