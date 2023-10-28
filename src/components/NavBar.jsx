import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex items-center justify-around p-2 font-poppins">
        <Link to={"/"}>
          <img src={"/images/icons/home-icon.png"} className="w-10" />
        </Link>
        <Link to={"/shop"}>SHOP</Link>
        <Link to={"/cart"}>
          <img src={"/images/icons/cart-icon.png"} className="w-10" />
        </Link>
      </div>
    </>
  );
}
