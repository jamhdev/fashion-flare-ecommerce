import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../ShoppingCart/context";

export default function NavBar() {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [amountOfCartItems, setAmountOfCartItems] = useState(0);
  const [animationKey, setAnimationKey] = useState(false);

  useEffect(() => {
    let totalItems = 0;
    shoppingCart.forEach((value) => {
      totalItems += value.quantity;
    });
    setAmountOfCartItems(totalItems);
    setAnimationKey((prevKey) => !prevKey); // Increment the key to force re-render
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
            <div className="absolute right-0 top-0 -translate-y-2 translate-x-2">
              <div
                key={animationKey}
                className="animate-bounceOnce rounded-xl bg-white p-0.5 font-oswald text-lg text-green-500"
              >
                {amountOfCartItems}
              </div>
            </div>
          ) : null}
        </Link>
      </div>
    </>
  );
}
