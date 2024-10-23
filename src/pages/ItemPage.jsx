import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContextProvider";

export default function ItemPage() {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);
  const {
    addShoppingCartItem,
    removeShoppingCartItem,
    shoppingCart,
    setShoppingCart,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(null);

  const itemInCart =
    itemData && shoppingCart.find((value) => value.id === itemData.id);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://fakestoreapi.com/products/${itemId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItemData(json);
      })
      .catch((err) => {
        console.error(err);
        setErrorState(err);
        navigate("/shop");
      })
      .finally(() => {
        setLoadingState(false);
      });

    return () => controller.abort();
  }, [itemId]);

  if (loadingState) {
    return (
      <>
        <div className="flex h-screen items-center justify-center">
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
        <div className="flex h-screen items-center justify-center">
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
      <div className="flex min-h-screen w-full flex-col p-4 font-oswald">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="group block">
            <img
              src={itemData.image}
              alt=""
              className="h-80 rounded object-contain md:h-auto"
            />

            <div className="mt-3">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                {itemData.title}
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                <span>${itemData.price}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center gap-4 p-2 font-poppins">
            <p>{itemData.description}</p>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="flex items-center gap-0.5 text-indigo-500">
                  {[...Array(5)].map((_, index) => {
                    const starPercentage =
                      Math.min(Math.max(itemData.rating.rate - index, 0), 1) *
                      100;

                    return (
                      <div key={index} className="relative h-5 w-5">
                        {/* Empty Star */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute left-0 top-0 h-5 w-5 text-gray-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 
            0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 
            1.371 1.24.588 1.81l-2.8 2.034a1 1 0 
            00-.364 1.118l1.07 3.292c.3.921-.755 
            1.688-1.54 1.118l-2.8-2.034a1 1 0 
            00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
            1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
            1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                        {/* Filled Star */}
                        <div
                          className="absolute left-0 top-0 h-5 overflow-hidden"
                          style={{ width: `${starPercentage}%` }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 
              0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 
              1.371 1.24.588 1.81l-2.8 2.034a1 1 0 
              00-.364 1.118l1.07 3.292c.3.921-.755 
              1.688-1.54 1.118l-2.8-2.034a1 1 0 
              00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
              1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
              1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>{itemData.rating.count}</div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>${itemData.price}</span>
                {itemInCart && itemInCart.quantity > 0 ? (
                  <div>
                    <div className="flex gap-1 rounded-lg border-[1px] border-gray-400">
                      <button
                        type="button"
                        className="flex w-10 cursor-pointer items-center justify-center leading-10 text-gray-600  transition-all hover:bg-gray-200 hover:opacity-75 "
                        onClick={() => {
                          removeShoppingCartItem(
                            itemData.id,
                            itemData.title,
                            itemData.price,
                            itemData.image,
                            shoppingCart,
                            setShoppingCart
                          );
                        }}
                      >
                        -
                      </button>

                      <div
                        id="Quantity"
                        className="flex h-10 w-16 select-none items-center justify-center rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      >
                        {itemInCart.quantity}
                      </div>

                      <button
                        type="button"
                        className=" flex w-10 cursor-pointer items-center justify-center leading-10 text-gray-600  transition-all hover:bg-gray-200 hover:opacity-75"
                        onClick={() => {
                          addShoppingCartItem(
                            itemData.id,
                            itemData.title,
                            itemData.price,
                            itemData.image,
                            shoppingCart,
                            setShoppingCart
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="w-32 rounded-md bg-indigo-400 p-4 font-poppins transition-all hover:scale-110 hover:bg-indigo-500"
                    onClick={() => {
                      if (!itemInCart) {
                        addShoppingCartItem(
                          itemData.id,
                          itemData.title,
                          itemData.price,
                          itemData.image,
                          shoppingCart,
                          setShoppingCart
                        );
                      }
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
