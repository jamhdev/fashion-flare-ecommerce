import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../Router";

export default function NavBar() {
  const { shoppingCart } = useContext(ShoppingCartContext);
  let [amountOfCartItems, setAmountOfCartItems] = useState(0);

  useEffect(() => {
    let totalItems = 0;
    shoppingCart.forEach((value) => {
      totalItems += value.quantity;
    });
    setAmountOfCartItems(totalItems);
  }, [shoppingCart]);

  return (
    <>
      <div className="m-auto flex max-w-6xl items-center justify-around p-2 font-poppins">
        <Link to={"/"}>
          <img
            src={"/images/icons/home-icon.png"}
            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
          />
        </Link>
        <Link
          to={"/shop"}
          className="transition-all hover:scale-110 hover:cursor-pointer"
        >
          SHOP
        </Link>
        <Link to={"/cart"} className="relative">
          <img
            src={"/images/icons/cart-icon.png"}
            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
          />
          {amountOfCartItems && amountOfCartItems > 0 ? (
            <div className="absolute right-0 top-0 -translate-y-2 translate-x-2 rounded-xl bg-white p-0.5 font-oswald text-lg text-green-500">
              {amountOfCartItems}
            </div>
          ) : null}
        </Link>
      </div>
    </>
  );
}
