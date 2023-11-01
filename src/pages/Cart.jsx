import React, { useContext } from "react";
import { ShoppingCartContext } from "../Router";
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
  } = useContext(ShoppingCartContext);

  const shoppingCartData = shoppingCart.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <div className="m-auto flex max-w-2xl rounded-lg p-2 font-poppins shadow-md">
          <img
            src={value.image}
            alt="Item Image"
            className="max-h-20 object-contain"
          />

          <div className="flex flex-grow flex-col pl-2">
            <div className="text-left">{value.title}</div>
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src="/images/icons/minus-icon.png"
                  alt="Minus One"
                  className="w-5 object-contain transition-all hover:scale-110 hover:cursor-pointer"
                  onClick={() => {
                    removeShoppingCartItem(
                      value.id,
                      value.title,
                      value.price,
                      value.image
                    );
                  }}
                />
                <div className="ml-1 mr-1">Qty: {value.quantity}</div>
                <img
                  src="/images/icons/plus-icon.png"
                  alt="Plus One"
                  className="w-5 object-contain transition-all hover:scale-110 hover:cursor-pointer"
                  onClick={() => {
                    addShoppingCartItem(
                      value.id,
                      value.title,
                      value.price,
                      value.image
                    );
                  }}
                />
              </div>
              <div className="flex">
                <span>${currency(value.price * value.quantity).value}</span>
                <img
                  src="/images/icons/trash-icon.png"
                  alt="trash icon"
                  className="ml-2 mr-2 w-5 cursor-pointer transition-all hover:scale-110"
                  onClick={() => {
                    deleteAllOfSpecificItem(value.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="min-h-screen bg-white text-center">
      {shoppingCart.length > 0 ? (
        <>
          {shoppingCartData}
          <div className="m-auto mt-10 flex max-w-xs flex-col font-poppins">
            <div className="text-2xl">Order Summary</div>
            <div className="text-xl">Total: ${subTotal}</div>
            <Link
              className="m-8 mt-4 rounded-3xl bg-orange-400 p-4 transition-all hover:scale-110 hover:bg-orange-500"
              to={"/"}
            >
              Complete Purchase
            </Link>
          </div>
        </>
      ) : (
        <h1 className="font-poppins text-4xl">Your cart is empty!</h1>
      )}
    </div>
  );
}
