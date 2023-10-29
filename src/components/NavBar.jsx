import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
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
        <Link to={"/cart"}>
          <img
            src={"/images/icons/cart-icon.png"}
            className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
          />
        </Link>
      </div>
    </>
  );
}
