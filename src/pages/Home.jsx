import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-around bg-[url('/images/background-nature.jpg')] bg-cover bg-center font-oswald">
        <div className=" text-center text-6xl text-white drop-shadow-2xl">
          Define Your Style, Redefine Fashion.
        </div>
        <button className="sm: rounded-lg border-2 border-green-100 p-2 text-center text-5xl  text-green-100 hover:border-gray-500 hover:bg-green-100  hover:text-gray-500 ">
          <Link to={"/shop"}>Shop Now</Link>
        </button>
      </div>
    </>
  );
}
