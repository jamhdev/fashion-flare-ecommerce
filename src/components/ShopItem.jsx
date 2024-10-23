import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import AddedToCartNotificationModal from "./AddedToCartNotificationModal";
import { Link } from "react-router-dom";

export default function ShopItem({ image, title, price, rating, id }) {
  const {
    shoppingCart,
    setShoppingCart,
    addShoppingCartItem,
    removeShoppingCartItem,
  } = useContext(AppContext);

  const itemInCart = shoppingCart.find((value) => value.id === id);
  const [addedToCartModal, setAddedToCartModal] = useState(false);

  const toggleAddedToCartModal = () => {
    setAddedToCartModal(true);
    setTimeout(() => {
      setAddedToCartModal(false);
    }, 1000);
  };

  return (
    <>
      <div className="group relative block h-full w-full overflow-hidden p-2">
        <Link to={`${id}`} className="flex items-center justify-center">
          <img
            src={image}
            alt=""
            className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </Link>

        <div className="relative border border-gray-100 bg-white p-6">
          <span className="flex items-center justify-start whitespace-nowrap px-3 py-1.5 text-xs font-medium">
            {rating.rate}
            <div className="flex items-center gap-0.5 text-indigo-500">
              {[...Array(5)].map((_, index) => {
                const starPercentage =
                  Math.min(Math.max(rating.rate - index, 0), 1) * 100;

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
          </span>

          <h3 className="mt-4 line-clamp-1 text-lg font-medium text-gray-900">
            {title}
          </h3>

          <p className="mt-1.5 text-sm text-gray-700">${price}</p>

          <form className="mt-4">
            {itemInCart && itemInCart.quantity > 0 ? (
              <div className="flex items-center justify-center ">
                <div className="flex gap-1 rounded-lg border-[1px] border-gray-400">
                  <button
                    type="button"
                    className="flex w-10 cursor-pointer items-center justify-center leading-10 text-gray-600  transition-all hover:bg-gray-200 hover:opacity-75 "
                    onClick={() => {
                      removeShoppingCartItem(
                        id,
                        title,
                        price,
                        image,
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
                      toggleAddedToCartModal();
                      addShoppingCartItem(
                        id,
                        title,
                        price,
                        image,
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
                className="block w-full rounded bg-indigo-400 p-4 text-sm font-medium transition hover:scale-105"
                onClick={() => {
                  toggleAddedToCartModal();
                  addShoppingCartItem(
                    id,
                    title,
                    price,
                    image,
                    shoppingCart,
                    setShoppingCart
                  );
                }}
              >
                Add to Cart
              </button>
            )}
          </form>
        </div>
        {addedToCartModal ? (
          <AddedToCartNotificationModal image={image} />
        ) : null}
      </div>
    </>
  );
}
