import React, { useContext } from "react";
import { ShoppingCartContext } from "../Router";

export default function Cart() {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  const shoppingCartData = shoppingCart.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <div className="m-2 rounded-lg border-2 border-red-300 p-2">
          {value}
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="min-h-screen bg-gray-400 text-center">
      {shoppingCart.length > 0 ? (
        shoppingCartData
      ) : (
        <h1>Your cart is empty!</h1>
      )}
    </div>
  );
}
