import { useContext } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { Link } from "react-router-dom";
import currency from "currency.js";

export default function Cart() {
  const {
    shoppingCart,
    setShoppingCart,
    addShoppingCartItem,
    removeShoppingCartItem,
    subTotal,
    deleteAllOfSpecificItem,
    handleNavTabChange,
  } = useContext(AppContext);

  const vatRate = 0.1; // 10% VAT rate, change as needed
  const vatAmount = subTotal * vatRate; // VAT amount calculation
  const total = subTotal + vatAmount; // Total calculation

  const ShoppingCartItems = shoppingCart.map((value, index) => {
    return (
      <li
        className="flex flex-col items-center justify-between gap-4 rounded-lg p-2 transition-all hover:shadow-lg md:flex-row"
        key={index}
      >
        <div className="flex items-center justify-start gap-4">
          <img
            src={value.image}
            alt=""
            className="size-16 h-20 w-20 rounded object-contain"
          />

          <div>
            <h3 className="text-sm text-gray-900">{value.title}</h3>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <div className="flex">
            <span>${currency(value.price * value.quantity).value}</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="flex items-center justify-center ">
              <div className="flex gap-1 rounded-lg border-[1px] border-gray-400">
                <button
                  type="button"
                  className="flex w-10 cursor-pointer items-center justify-center leading-10 text-gray-600  transition-all hover:bg-gray-200 hover:opacity-75 "
                  onClick={() => {
                    removeShoppingCartItem(
                      value.id,
                      value.title,
                      value.price,
                      value.image,
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
                  {value.quantity}
                </div>

                <button
                  type="button"
                  className=" flex w-10 cursor-pointer items-center justify-center leading-10 text-gray-600  transition-all hover:bg-gray-200 hover:opacity-75"
                  onClick={() => {
                    addShoppingCartItem(
                      value.id,
                      value.title,
                      value.price,
                      value.image,
                      shoppingCart,
                      setShoppingCart
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="text-gray-600 transition hover:text-red-600"
              onClick={() => {
                deleteAllOfSpecificItem(
                  value.id,
                  shoppingCart,
                  setShoppingCart
                );
              }}
            >
              <span className="sr-only">Remove item</span>
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
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-white text-center">
      {shoppingCart.length === 0 ? (
        <section className="bg-primaryBackground">
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Your cart is empty
                <strong className="font-extrabold text-indigo-700 sm:block">
                  Shop Now!
                </strong>
              </h1>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
                  to={"/shop"}
                  onClick={() => {
                    handleNavTabChange("shop");
                  }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">{ShoppingCartItems}</ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>${subTotal.toFixed(2)}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>VAT</dt>
                        <dd>${vatAmount.toFixed(2)}</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>${total.toFixed(2)}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4 -ms-1 me-1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>

                        <p className="whitespace-nowrap text-xs">
                          2 Discounts Applied
                        </p>
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <Link
                        to={"/"}
                        className="block rounded bg-indigo-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-indigo-600"
                        onClick={() => {
                          shoppingCart.forEach((element) => {
                            deleteAllOfSpecificItem(
                              element.id,
                              shoppingCart,
                              setShoppingCart
                            );
                          });
                        }}
                      >
                        {" "}
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
