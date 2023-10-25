import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex justify-around">
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/cart"}>Cart</Link>
      </div>
    </>
  );
}
